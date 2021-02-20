package com.vsnamta.bookstore.service.cart;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.CartRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;
import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.member.LoginMember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class CartService {
    private CartRepository cartRepository;
    private MemberRepository memberRepository;
    private ProductRepository productRepository;

    @Autowired
    public CartService(CartRepository cartRepository, MemberRepository memberRepository,
            ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public CartResult save(CartSavePayload cartSavePayload) {
        Cart cart = cartRepository.findByMemberIdAndProductId(cartSavePayload.getMemberId(), cartSavePayload.getProductId())
            .map(existingCart -> {
                existingCart.updateQuantity(existingCart.getQuantity() + cartSavePayload.getQuantity());

                return existingCart;
            })
            .orElseGet(() -> 
                cartRepository.save(createCart(cartSavePayload))
            );
        
        return new CartResult(cart);   
    }

    private Cart createCart(CartSavePayload cartSavePayload) {
        Member member = memberRepository.findById(cartSavePayload.getMemberId()).get();

        Product product = productRepository.findById(cartSavePayload.getProductId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        return Cart.createCart(member, product, cartSavePayload.getQuantity());
    }

    @Transactional
    public CartResult update(LoginMember loginMember, Long id, CartUpdatePayload cartUpdatePayload) {
        Cart cart = cartRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        if(!loginMember.checkMyCart(cart)) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }

        cart.updateQuantity(cartUpdatePayload.getQuantity());

        return new CartResult(cart);
    }

    @Transactional
    public void remove(LoginMember loginMember, List<Long> ids) {
        List<Cart> carts = cartRepository.findByIds(ids);

        for(Cart cart : carts) {
            if(!loginMember.checkMyCart(cart)) {
                throw new NotEnoughPermissionException("요청 권한이 없습니다.");
            }
            cartRepository.remove(cart);
        }
    }

    @Transactional(readOnly = true)
    public List<CartResult> findAll(Long memberId) {
        return cartRepository.findAll(memberId)
            .stream()
            .map(CartResult::new)
            .collect(Collectors.toList());
    }
}