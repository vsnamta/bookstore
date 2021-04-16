package com.vsnamta.bookstore.service.order;

import static com.vsnamta.bookstore.Fixtures.aDeliveryInfo;
import static com.vsnamta.bookstore.Fixtures.aDiscountPolicy;
import static com.vsnamta.bookstore.Fixtures.aMember;
import static com.vsnamta.bookstore.Fixtures.aProduct;
import static com.vsnamta.bookstore.Fixtures.anOrderStatusInfo;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import java.time.LocalDateTime;
import java.util.Arrays;

import javax.persistence.EntityManager;

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
import com.vsnamta.bookstore.service.discount.MemoryDiscountPolicyRepository;
import com.vsnamta.bookstore.service.member.MemoryMemberRepository;
import com.vsnamta.bookstore.service.point.MemoryPointHistoryRepository;
import com.vsnamta.bookstore.service.product.MemoryProductRepository;
import com.vsnamta.bookstore.service.stock.MemoryStockRepository;

import org.junit.Before;
import org.junit.Test;

public class OrderStatusUpdateTaskTest {
    private OrderRepository orderRepository;
    private MemberRepository memberRepository;
    private DiscountPolicyRepository discountPolicyRepository; 
    private ProductRepository productRepository; 
    private OrderStatusUpdateTask orderStatusUpdateTask;

    @Before
    public void setUp() {
        orderRepository = new MemoryOrderRepository();
        memberRepository = new MemoryMemberRepository();
        discountPolicyRepository = new MemoryDiscountPolicyRepository();
        productRepository = new MemoryProductRepository();
    
        orderStatusUpdateTask = new OrderStatusUpdateTask(
            mock(EntityManager.class), 
            orderRepository, 
            new OrderStatusSettingService(
                new MemoryStockRepository(), new MemoryPointHistoryRepository()
            )
        );
    }

    @Test
    public void 일주일이_지나도록_주문완료_상태인_주문은_구매확정_상태로_변경() {
        // given
        Member member = memberRepository.save(aMember().id("test").name("홍길동").point(0).build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(
            aDiscountPolicy().name("기본").discountPercent(10).depositPercent(5).build()
        );

        Product product = productRepository.save(
            aProduct().discountPolicy(discountPolicy).name("Clean Code").regularPrice(33000).build()
        );

        Order order = Order.createOrder(
            member, 
            Arrays.asList(
                OrderLine.createOrderLine(product, 1)
            ), 
            0, 
            aDeliveryInfo().build()
        );
        
        order.updateStatusInfo(
            anOrderStatusInfo()
                .status(OrderStatus.ORDERED)
                .updatedDate(LocalDateTime.now().minusDays(8))
                .build()
        );

        Long id = orderRepository.save(order).getId();

        // when
        orderStatusUpdateTask.excute();

        // then
        order = orderRepository.findById(id).get();
        member = memberRepository.findById(member.getId()).get();

        assertEquals(OrderStatus.COMPLETED, order.getStatusInfo().getStatus());
        assertEquals(1650, member.getPoint());
    }
}
