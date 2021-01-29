package com.vsnamta.bookstore.service.order;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.CartRepository;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderLine;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.domain.order.OrderStatusSettingService;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.common.exception.DataNotFoundException;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;
import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class OrderService {
    private OrderRepository orderRepository;
    private MemberRepository memberRepository;
    private ProductRepository productRepository;
    private CartRepository cartRepository;
    private OrderStatusSettingService orderStatusSettingService;

    @Autowired
    public OrderService(OrderRepository orderRepository, MemberRepository memberRepository,
            ProductRepository productRepository, CartRepository cartRepository,
            OrderStatusSettingService orderStatusSettingService) {
        this.orderRepository = orderRepository;
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.orderStatusSettingService = orderStatusSettingService;
    }

    @Transactional
    public Long save(OrderSavePayload orderSavePayload) {
        Member member = memberRepository.findById(orderSavePayload.getMemberId()).get();
        List<OrderLine> orderLines = createOrderLines(orderSavePayload.getOrderProducts());

        Order order = Order.createOrder(member, orderLines, orderSavePayload.getUsedPoint(), orderSavePayload.createDeliveryInfo());      
        
        orderStatusSettingService.ordered(order);

        return orderRepository.save(order).getId();
    }

    private List<OrderLine> createOrderLines(List<OrderSavePayload.OrderProduct> orderProducts) {
        List<Long> productIds = orderProducts.stream()
            .map(orderLine -> orderLine.getProductId())
            .collect(Collectors.toList());

        Map<Long, Product> productMap = 
            productRepository.findByIds(productIds)
                .stream()
                .collect(Collectors.toMap(product -> product.getId(), product -> product));

        List<OrderLine> orderLines = orderProducts.stream()
            .map(
                orderLine -> 
                    OrderLine.createOrderLine(
                        productMap.get(orderLine.getProductId()), 
                        orderLine.getQuantity()
                )
            )
            .collect(Collectors.toList());

        if(checkCartOrder(orderProducts)) {
            removeCarts(orderProducts);
        }    

        return orderLines;
    }

    private boolean checkCartOrder(List<OrderSavePayload.OrderProduct> orderProducts) {
        return orderProducts.get(0).getCartId() != null;
    }

    private void removeCarts(List<OrderSavePayload.OrderProduct> orderProducts) {
        List<Long> cartIds = orderProducts.stream()
            .map(orderProduct -> orderProduct.getCartId())
            .collect(Collectors.toList());

        List<Cart> carts = cartRepository.findByIds(cartIds);

        for(Cart cart : carts) {
            cartRepository.remove(cart);
        }
    }

    @Transactional
    public Long update(Long id, OrderUpdatePayload orderUpdatePayload) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        switch (orderUpdatePayload.getStatus()) {
            case CANCELED:
                orderStatusSettingService.canceld(order);
                break;
            case COMPLETED:
                orderStatusSettingService.completed(order);
                break;
        }

        return id;
    }

    @Transactional(readOnly = true)
    public OrderDetailResult findOne(Long id) {
        Order order = orderRepository.findOne(id)
            .orElseThrow(() -> new DataNotFoundException("요청하신 데이터를 찾을 수 없습니다."));

		return new OrderDetailResult(order);
    }

    @Transactional(readOnly = true)
    public Page<OrderResult> findAll(FindPayload findPayload) {
        SearchRequest searchRequest = findPayload.getSearchCriteria().toRequest();
        PageRequest pageRequest = findPayload.getPageCriteria().toRequest();
        
        List<OrderResult> orderResults = 
            orderRepository.findAll(searchRequest, pageRequest)
                .stream()
                .map(OrderResult::new)
                .collect(Collectors.toList());

        long totalCount = orderRepository.findTotalCount(searchRequest);
    
        return new Page<OrderResult>(orderResults, totalCount);
    }
}