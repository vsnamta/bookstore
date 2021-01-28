package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.DomainBuilder.aDeliveryInfo;
import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aPageRequest;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static com.vsnamta.bookstore.DomainBuilder.aSearchRequest;
import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.List;

import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderLine;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Repository.class))
public class JpaOrderRepositoryTest {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository; 

    @Autowired
    private DiscountPolicyRepository discountPolicyRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void 주문번호로_주문_조회() {
         // given
        Member member = memberRepository.save(aMember().name("홍길동").build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product1 = productRepository.save(aProduct().discountPolicy(discountPolicy).name("Clean Code").build());
        Product product2 = productRepository.save(aProduct().discountPolicy(discountPolicy).name("리팩토링").build());

        Long id = orderRepository.save(
            Order.createOrder(
                member, 
                Arrays.asList(
                    OrderLine.createOrderLine(product1, 1),
                    OrderLine.createOrderLine(product2, 1)
                ), 
                0, 
                aDeliveryInfo().build()
            )
        )
        .getId();

        // when
        Order order = orderRepository.findOne(id).get();
        
        // then
        assertEquals("홍길동", order.getMember().getName()); 
        assertEquals(2, order.getOrderLines().size());
    }

    @Test
    public void 회원번호로_주문_조회() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product = productRepository.save(aProduct().discountPolicy(discountPolicy).name("Clean Code").build());

        orderRepository.save(
            Order.createOrder(
                member, 
                Arrays.asList(
                    OrderLine.createOrderLine(product, 1)
                ), 
                0, 
                aDeliveryInfo().build()
            )
        );

        // when
        List<Order> orders = orderRepository.findAll(
            aSearchRequest()
                .column("memberId")
                .keyword(String.valueOf(member.getId()))
                .build(),
            aPageRequest().build()    
        );
        
        // then
        assertEquals(1, orders.size());
    }
}