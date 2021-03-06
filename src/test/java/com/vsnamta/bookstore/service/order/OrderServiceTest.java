package com.vsnamta.bookstore.service.order;

import static com.vsnamta.bookstore.Fixtures.aCart;
import static com.vsnamta.bookstore.Fixtures.aDeliveryInfo;
import static com.vsnamta.bookstore.Fixtures.aDiscountPolicy;
import static com.vsnamta.bookstore.Fixtures.aMember;
import static com.vsnamta.bookstore.Fixtures.aProduct;
import static com.vsnamta.bookstore.Fixtures.aStockInfo;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.Arrays;
import java.util.Optional;

import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.CartRepository;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderLine;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.domain.order.OrderStatus;
import com.vsnamta.bookstore.domain.order.OrderStatusSettingService;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.cart.MemoryCartRepository;
import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.discount.MemoryDiscountPolicyRepository;
import com.vsnamta.bookstore.service.member.MemoryMemberRepository;
import com.vsnamta.bookstore.service.point.MemoryPointHistoryRepository;
import com.vsnamta.bookstore.service.product.MemoryProductRepository;
import com.vsnamta.bookstore.service.stock.MemoryStockRepository;

import org.junit.Before;
import org.junit.Test;

public class OrderServiceTest {
    private OrderRepository orderRepository;
    private MemberRepository memberRepository;
    private DiscountPolicyRepository discountPolicyRepository;
    private ProductRepository productRepository;
    private CartRepository cartRepository;
    private OrderStatusSettingService orderStatusSettingService;
    private OrderService orderService;

    @Before
    public void setUp() {
        orderRepository = new MemoryOrderRepository();
        memberRepository = new MemoryMemberRepository();
        discountPolicyRepository = new MemoryDiscountPolicyRepository();
        productRepository = new MemoryProductRepository();
        cartRepository = new MemoryCartRepository();    
        
        orderStatusSettingService = new OrderStatusSettingService(
            new MemoryStockRepository(), new MemoryPointHistoryRepository()
        );

        orderService = new OrderService(
            orderRepository, memberRepository, productRepository, cartRepository, orderStatusSettingService
        );
    }

    @Test
    public void ???????????????_??????_????????????_??????() {
        // given
        Member member = memberRepository.save(aMember().id("test").name("?????????").build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product = productRepository.save(aProduct().discountPolicy(discountPolicy).name("Clean Code").build());

        Cart cart = cartRepository.save(aCart().member(member).product(product).quantity(1).build());

        OrderSavePayload.OrderProduct orderProduct = new OrderSavePayload.OrderProduct();
        orderProduct.setCartId(cart.getId());
        orderProduct.setProductId(cart.getProduct().getId());
        orderProduct.setQuantity(cart.getQuantity());

        OrderSavePayload orderSavePayload = new OrderSavePayload();
        orderSavePayload.setMemberId(member.getId());
        orderSavePayload.setOrderProducts(Arrays.asList(orderProduct));
        orderSavePayload.setUsedPoint(0);

        // when
        Long orderId = orderService.save(orderSavePayload).getId();

        // then
        Order order = orderRepository.findById(orderId).get();
        Optional<Cart> cartOpt = cartRepository.findById(cart.getId());

        assertEquals(OrderStatus.ORDERED, order.getStatusInfo().getStatus());
        assertEquals(false, cartOpt.isPresent());
    }

    @Test
    public void ???????????????_?????????_??????_??????_???_?????????_???????????????_??????() {
        // given
        Member member = memberRepository.save(aMember().id("test").name("?????????").point(1000).build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product = productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .name("Clean Code")
                .stockInfo(aStockInfo().stockQuantity(10).build())
                .build()
        );

        OrderSavePayload.OrderProduct orderProduct = new OrderSavePayload.OrderProduct();
        orderProduct.setProductId(product.getId());
        orderProduct.setQuantity(1);

        OrderSavePayload orderSavePayload = new OrderSavePayload();
        orderSavePayload.setMemberId(member.getId());
        orderSavePayload.setOrderProducts(Arrays.asList(orderProduct));
        orderSavePayload.setUsedPoint(1000);

        // when
        Long orderId = orderService.save(orderSavePayload).getId();

        // then
        Order order = orderRepository.findById(orderId).get();
        product = productRepository.findById(product.getId()).get();
        member = memberRepository.findById(member.getId()).get();

        assertEquals(OrderStatus.ORDERED, order.getStatusInfo().getStatus());
        assertEquals(9, product.getStockInfo().getStockQuantity());
        assertEquals(0, member.getPoint());
    }

    @Test
    public void ???????????????_?????????_??????_??????_???_?????????_???????????????_??????() {
        // given   
        Member member = memberRepository.save(aMember().id("test").name("?????????").point(1000).build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product = productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .name("Clean Code")
                .stockInfo(aStockInfo().stockQuantity(10).build())
                .build()
        );

        Order order = orderRepository.save(
            Order.createOrder(
                member,
                Arrays.asList(
                    OrderLine.createOrderLine(product, 1)
                ), 
                0, 
                aDeliveryInfo().build()
            )
        );
        orderStatusSettingService.ordered(order);
        
        OrderUpdatePayload orderUpdatePayload = new OrderUpdatePayload();
        orderUpdatePayload.setStatus(OrderStatus.CANCELED);

        // when
        orderService.update(member.getId(), order.getId(), orderUpdatePayload);

        // then
        order = orderRepository.findById(order.getId()).get();
        product = productRepository.findById(product.getId()).get();
        member = memberRepository.findById(member.getId()).get();

        assertEquals(OrderStatus.CANCELED, order.getStatusInfo().getStatus());
        assertEquals(10, product.getStockInfo().getStockQuantity());
        assertEquals(1000, member.getPoint());
    }

    @Test(expected = NotEnoughPermissionException.class)
    public void ???????????????_?????????_??????() {
        // given   
        Member member = memberRepository.save(aMember().id("test1").name("?????????").point(1000).build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product = productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .name("Clean Code")
                .stockInfo(aStockInfo().stockQuantity(10).build())
                .build()
        );

        Order order = orderRepository.save(
            Order.createOrder(
                member,
                Arrays.asList(
                    OrderLine.createOrderLine(product, 1)
                ), 
                1000, 
                aDeliveryInfo().build()
            )
        );
        orderStatusSettingService.ordered(order);

        OrderUpdatePayload orderUpdatePayload = new OrderUpdatePayload();
        orderUpdatePayload.setStatus(OrderStatus.CANCELED);

        Member otherMember = memberRepository.save(aMember().id("test2").name("?????????").build());

        // when
        orderService.update(otherMember.getId(), order.getId(), orderUpdatePayload);

        // then
        fail();
    }

    @Test
    public void ???????????????_?????????_?????????_??????() {
        // given   
        Member member = memberRepository.save(aMember().id("test").name("?????????").point(0).build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(
            aDiscountPolicy().name("??????").discountPercent(10).depositPercent(5).build()
        );

        Product product = productRepository.save(
            aProduct().discountPolicy(discountPolicy).name("Clean Code").regularPrice(33000).build()
        );

        Order order = orderRepository.save(
            Order.createOrder(
                member, 
                Arrays.asList(
                    OrderLine.createOrderLine(product, 1)
                ), 
                0, 
                aDeliveryInfo().build()
            )
        );
        orderStatusSettingService.ordered(order);

        OrderUpdatePayload orderUpdatePayload = new OrderUpdatePayload();
        orderUpdatePayload.setStatus(OrderStatus.COMPLETED);

        // when
        orderService.update(member.getId(), order.getId(), orderUpdatePayload);

        // then
        order = orderRepository.findById(order.getId()).get();
        member = memberRepository.findById(member.getId()).get();

        assertEquals(OrderStatus.COMPLETED, order.getStatusInfo().getStatus());
        assertEquals(1650, member.getPoint());
    }
}