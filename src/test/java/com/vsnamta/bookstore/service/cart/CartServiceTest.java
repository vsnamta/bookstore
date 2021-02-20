package com.vsnamta.bookstore.service.cart;

import static com.vsnamta.bookstore.DomainBuilder.aCart;
import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.Arrays;
import java.util.Optional;

import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.CartRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.member.LoginMember;
import com.vsnamta.bookstore.service.member.MemoryMemberRepository;
import com.vsnamta.bookstore.service.product.MemoryProductRepository;

import org.junit.Before;
import org.junit.Test;

public class CartServiceTest {
    private CartRepository cartRepository;
    private MemberRepository memberRepository;
    private ProductRepository productRepository;
    private CartService cartService;

    @Before
    public void setUp() {
        cartRepository = new MemoryCartRepository();
        memberRepository = new MemoryMemberRepository();
        productRepository = new MemoryProductRepository();
        
        cartService = new CartService(cartRepository, memberRepository, productRepository);
    }

    @Test
    public void 장바구니_저장() {
        // given   
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        CartSavePayload cartSavePayload = new CartSavePayload();
        cartSavePayload.setMemberId(member.getId());
        cartSavePayload.setProductId(product.getId());
        cartSavePayload.setQuantity(1);

        // when
        Long cartId = cartService.save(cartSavePayload).getId();

        // then
        Cart cart = cartRepository.findById(cartId).get();

        assertEquals("Clean Code", cart.getProduct().getName());
        assertEquals(1, cart.getQuantity());
    }

    @Test
    public void 장바구니_저장시_이미_존재하는_상품은_수량이_증가() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        cartRepository.save(aCart().member(member).product(product).quantity(1).build());

        CartSavePayload cartSavePayload = new CartSavePayload();
        cartSavePayload.setMemberId(member.getId());
        cartSavePayload.setProductId(product.getId());
        cartSavePayload.setQuantity(1);

        // when
        Long cartId = cartService.save(cartSavePayload).getId();

        // then
        Cart cart = cartRepository.findById(cartId).get();

        assertEquals("Clean Code", cart.getProduct().getName());
        assertEquals(2, cart.getQuantity());
    }

    @Test
    public void 장바구니_수량_변경() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());
        
        Cart cart = cartRepository.save(aCart().member(member).product(product).quantity(2).build());

        CartUpdatePayload cartUpdatePayload = new CartUpdatePayload();
        cartUpdatePayload.setQuantity(1);

        // when
        cartService.update(new LoginMember(member), cart.getId(), cartUpdatePayload);

        // then
        cart = cartRepository.findById(cart.getId()).get();

        assertEquals("Clean Code", cart.getProduct().getName());
        assertEquals(1, cart.getQuantity());
    }

    @Test(expected = NotEnoughPermissionException.class)
    public void 장바구니_수량_변경은_본인만_가능() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());
        
        Cart cart = cartRepository.save(aCart().member(member).product(product).quantity(2).build());

        CartUpdatePayload cartUpdatePayload = new CartUpdatePayload();
        cartUpdatePayload.setQuantity(1);

        Member otherMember = memberRepository.save(aMember().name("임꺽정").build());

        // when
        cartService.update(new LoginMember(otherMember), cart.getId(), cartUpdatePayload);

        // then
        fail();
    }

    @Test
    public void 장바구니_삭제() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());

        Product product1 = productRepository.save(aProduct().name("Clean Code").build());
        Cart cart1 = cartRepository.save(aCart().member(member).product(product1).quantity(1).build());

        Product product2 = productRepository.save(aProduct().name("리팩토링").build());
        Cart cart2 = cartRepository.save(aCart().member(member).product(product2).quantity(1).build());

        // when
        cartService.remove(
            new LoginMember(member), 
            Arrays.asList(cart1.getId(), cart2.getId())
        );

        // then
        Optional<Cart> cartOpt1 = cartRepository.findById(cart1.getId());
        Optional<Cart> cartOpt2 = cartRepository.findById(cart2.getId());

        assertEquals(false, cartOpt1.isPresent());
        assertEquals(false, cartOpt2.isPresent());
    }

    @Test(expected = NotEnoughPermissionException.class)
    public void 장바구니_삭제는_본인만_가능() {
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        Cart cart = cartRepository.save(aCart().member(member).product(product).quantity(1).build());

        Member otherMember = memberRepository.save(aMember().name("임꺽정").build());

        // when
        cartService.remove(new LoginMember(otherMember), Arrays.asList(cart.getId()));

        // then
        fail();
    }
}