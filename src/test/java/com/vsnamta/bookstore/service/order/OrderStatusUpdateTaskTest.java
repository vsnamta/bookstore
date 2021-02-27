package com.vsnamta.bookstore.service.order;

import static com.vsnamta.bookstore.DomainBuilder.aDeliveryInfo;
import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static com.vsnamta.bookstore.DomainBuilder.anOrderStatusInfo;
import static org.junit.Assert.assertEquals;

import java.time.LocalDateTime;
import java.util.Arrays;

import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderLine;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.domain.order.OrderStatus;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@Transactional
public class OrderStatusUpdateTaskTest {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProductRepository productRepository; 

    @Autowired
    private DiscountPolicyRepository discountPolicyRepository; 

    @Autowired
    private OrderStatusUpdateTask orderStatusUpdateTask;

    @Test
    public void 일주일이_지나도록_주문완료_상태인_주문은_구매확정_상태로_변경() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product = productRepository.save(aProduct().discountPolicy(discountPolicy).name("Clean Code").build());

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
        order = orderRepository.findOne(id).get();

        assertEquals(OrderStatus.COMPLETED, order.getStatusInfo().getStatus());
    }
}
