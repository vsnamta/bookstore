package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.DomainBuilder.aCart;
import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.List;

import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.CartRepository;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
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
public class JpaCartRepositoryTest {
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DiscountPolicyRepository discountPolicyRepository;

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void 회원번호와_상품번호로_장바구니_조회() {
        //given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        cartRepository.save(aCart().member(member).product(product).quantity(1).build());

        // when
        Cart cart = cartRepository.findByMemberIdAndProductId(member.getId(), product.getId()).get();

        // then
        assertEquals("홍길동", cart.getMember().getName());
        assertEquals("Clean Code", cart.getProduct().getName());
        assertEquals(1, cart.getQuantity());
    } 

    @Test
    public void 장바구니번호_여러개로_장바구니_조회() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());

        Product product1 = productRepository.save(aProduct().name("Clean Code").build());
        Cart cart1 = cartRepository.save(aCart().member(member).product(product1).quantity(1).build());

        Product product2 = productRepository.save(aProduct().name("리팩토링").build());
        Cart cart2 = cartRepository.save(aCart().member(member).product(product2).quantity(1).build());

        // when
        List<Cart> carts = cartRepository.findByIds(Arrays.asList(cart1.getId(), cart2.getId()));

        // then
        assertEquals(2, carts.size());
    }

    @Test
    public void 회원번호로_장바구니_조회() {
        //given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product1 = productRepository.save(aProduct().discountPolicy(discountPolicy).name("Clean Code").build());
        cartRepository.save(aCart().member(member).product(product1).quantity(1).build());
        
        Product product2 = productRepository.save(aProduct().discountPolicy(discountPolicy).name("리팩토링").build());
        cartRepository.save(aCart().member(member).product(product2).quantity(1).build());

        // when
        List<Cart> carts = cartRepository.findAll(member.getId());

        // then
        assertEquals(2, carts.size());
    } 
}