package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.DomainBuilder.aCart;
import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.CartRepository;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.cart.CartSavePayload;
import com.vsnamta.bookstore.service.cart.CartUpdatePayload;
import com.vsnamta.bookstore.service.member.LoginMember;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@Transactional
public class CartApiControllerTest {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DiscountPolicyRepository discountPolicyRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithMockUser(roles="USER")
    @Test
    public void 장바구니_저장() throws Exception {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        CartSavePayload cartSavePayload = new CartSavePayload();
        cartSavePayload.setProductId(product.getId());
        cartSavePayload.setQuantity(1);

        // when and then
        ResultActions resultActions =
            mockMvc.perform(
                post("/api/carts")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(cartSavePayload))
                    .sessionAttr("loginMember", new LoginMember(member)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());
    }

    @WithMockUser(roles="USER")
    @Test
    public void 장바구니_수량_변경() throws Exception {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        Cart cart = cartRepository.save(aCart().member(member).product(product).quantity(2).build());

        CartUpdatePayload cartUpdatePayload = new CartUpdatePayload();
        cartUpdatePayload.setQuantity(1);

        // when
        ResultActions resultActions =
            mockMvc.perform(
                put("/api/carts/" + cart.getId())
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(cartUpdatePayload))
                    .sessionAttr("loginMember", new LoginMember(member)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());
    }

    @WithMockUser(roles="USER")
    @Test
    public void 장바구니_삭제() throws Exception {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());

        Product product1 = productRepository.save(aProduct().name("Clean Code").build());
        Cart cart1 = cartRepository.save(aCart().member(member).product(product1).quantity(1).build());

        Product product2 = productRepository.save(aProduct().name("리팩토링").build());
        Cart cart2 = cartRepository.save(aCart().member(member).product(product2).quantity(1).build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                delete("/api/carts")
                    .param("ids", String.valueOf(cart1.getId()))
                    .param("ids", String.valueOf(cart2.getId()))
                    .sessionAttr("loginMember", new LoginMember(member)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());
    }

    @WithMockUser(roles="USER")
    @Test
    public void 회원번호로_장바구니_조회() throws Exception {
         // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product1 = productRepository.save(aProduct().discountPolicy(discountPolicy).name("Clean Code").build());
        cartRepository.save(aCart().member(member).product(product1).quantity(1).build());
        
        Product product2 = productRepository.save(aProduct().discountPolicy(discountPolicy).name("리팩토링").build());
        cartRepository.save(aCart().member(member).product(product2).quantity(1).build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/carts")
                    .param("memberId", String.valueOf(member.getId()))
                    .sessionAttr("loginMember", new LoginMember(member)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());     
    }
}