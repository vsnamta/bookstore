package com.vsnamta.bookstore.web.api;

import java.util.Arrays;
import java.util.List;

import com.vsnamta.bookstore.service.cart.CartFindPayload;
import com.vsnamta.bookstore.service.cart.CartResult;
import com.vsnamta.bookstore.service.cart.CartSavePayload;
import com.vsnamta.bookstore.service.cart.CartService;
import com.vsnamta.bookstore.service.cart.CartUpdatePayload;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/api/carts")
    public Long save(@RequestBody CartSavePayload cartSavePayload) {
        return cartService.save(cartSavePayload);
    }

    @PutMapping("/api/carts/{id}")
    public Long update(@PathVariable Long id, @RequestBody CartUpdatePayload cartUpdatePayload) {
        return cartService.update(id, cartUpdatePayload);
    }

    @DeleteMapping("/api/carts")
    public void remove(Long[] ids) {
        cartService.remove(Arrays.asList(ids));
    }

    @GetMapping("/api/carts")
    public List<CartResult> findAll(CartFindPayload cartFindPayload) {
        return cartService.findAll(cartFindPayload.getMemberId());
    }
}