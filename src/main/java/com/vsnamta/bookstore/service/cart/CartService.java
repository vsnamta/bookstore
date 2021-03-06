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
            .orElseThrow(() -> new InvalidArgumentException("????????? ???????????? ?????? ?????? ?????????????????????."));

        return Cart.createCart(member, product, cartSavePayload.getQuantity());
    }

    @Transactional
    public CartResult update(String memberId, Long id, CartUpdatePayload cartUpdatePayload) {
        Member member = memberRepository.findById(memberId).get();

        Cart cart = cartRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("????????? ???????????? ?????? ?????? ?????????????????????."));

        if (!member.getId().equals(cart.getMember().getId())) {
            throw new NotEnoughPermissionException("?????? ????????? ????????????.");
        }

        if(cartUpdatePayload.getQuantity() > cart.getProduct().getStockInfo().getStockQuantity()) {
            // ????????? ??????
        }

        cart.updateQuantity(cartUpdatePayload.getQuantity());

        return new CartResult(cart);
    }

    @Transactional
    public void remove(String memberId, List<Long> ids) {
        Member member = memberRepository.findById(memberId).get();

        List<Cart> carts = cartRepository.findByIds(ids);

        for(Cart cart : carts) {
            if (!member.getId().equals(cart.getMember().getId())) {
                throw new NotEnoughPermissionException("?????? ????????? ????????????.");
            }

            cartRepository.remove(cart);
        }
    }

    @Transactional(readOnly = true)
    public List<CartResult> findAll(String memberId) {
        return cartRepository.findAll(memberId)
            .stream()
            .map(CartResult::new)
            .collect(Collectors.toList());
    }
}