package com.vsnamta.bookstore.web.api;

import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import com.vsnamta.bookstore.service.cart.CartFindPayload;
import com.vsnamta.bookstore.service.cart.CartResult;
import com.vsnamta.bookstore.service.cart.CartSavePayload;
import com.vsnamta.bookstore.service.cart.CartService;
import com.vsnamta.bookstore.service.cart.CartUpdatePayload;
import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.web.securiry.CustomUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class CartApiController {
    private CartService cartService;

    @Autowired
    public CartApiController(CartService cartService) {
        this.cartService = cartService;
    } 

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/api/carts")
    public CartResult save(@Valid @RequestBody CartSavePayload cartSavePayload, @AuthenticationPrincipal CustomUser customUser) {
        cartSavePayload.setMemberId(customUser.getId());

        return cartService.save(cartSavePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/api/carts/{id}")
    public CartResult update(@PathVariable Long id, @Valid @RequestBody CartUpdatePayload cartUpdatePayload, @AuthenticationPrincipal CustomUser customUser) {
        return cartService.update(customUser.getId(), id, cartUpdatePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/api/carts")
    public void remove(Long[] ids, @AuthenticationPrincipal CustomUser customUser) {
        cartService.remove(customUser.getId(), Arrays.asList(ids));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/carts")
    public List<CartResult> findAll(@Valid CartFindPayload cartFindPayload, @AuthenticationPrincipal CustomUser customUser) {
        if(customUser.hasUserRole() && !cartFindPayload.getMemberId().equals(customUser.getId())) {
            throw new NotEnoughPermissionException("?????? ????????? ????????????.");
        }

        return cartService.findAll(cartFindPayload.getMemberId());
    }
}