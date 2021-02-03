package com.vsnamta.bookstore.web.api;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.vsnamta.bookstore.service.cart.CartFindPayload;
import com.vsnamta.bookstore.service.cart.CartResult;
import com.vsnamta.bookstore.service.cart.CartSavePayload;
import com.vsnamta.bookstore.service.cart.CartService;
import com.vsnamta.bookstore.service.cart.CartUpdatePayload;
import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.member.LoginMember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public Long save(@Valid @RequestBody CartSavePayload cartSavePayload, HttpSession httpSession) {
        LoginMember loginMember = (LoginMember)httpSession.getAttribute("loginMember");

        cartSavePayload.setMemberId(loginMember.getId());

        return cartService.save(cartSavePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/api/carts/{id}")
    public Long update(@PathVariable Long id, @Valid @RequestBody CartUpdatePayload cartUpdatePayload, HttpSession httpSession) {
        LoginMember loginMember = (LoginMember)httpSession.getAttribute("loginMember");

        return cartService.update(loginMember, id, cartUpdatePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/api/carts")
    public void remove(Long[] ids, HttpSession httpSession) {
        LoginMember loginMember = (LoginMember)httpSession.getAttribute("loginMember");

        cartService.remove(loginMember, Arrays.asList(ids));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/carts")
    public List<CartResult> findAll(@Valid CartFindPayload cartFindPayload, HttpSession httpSession) {
        LoginMember loginMember = (LoginMember)httpSession.getAttribute("loginMember");

        if(loginMember.hasUserRole() && !cartFindPayload.getMemberId().equals(loginMember.getId())) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }

        return cartService.findAll(cartFindPayload.getMemberId());
    }
}