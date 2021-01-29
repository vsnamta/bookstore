package com.vsnamta.bookstore.service.cart;

import com.vsnamta.bookstore.domain.cart.Cart;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CartResult {
    private Long id;
    private Long productId;
    private String productName;
    private String imageFileName;
    private int regularPrice;
    private int stockQuantity;
    private int discountPercent;
    private int depositPercent;
    private int quantity;

    public CartResult(Cart cart) {
        this.id = cart.getId();
        this.productId = cart.getProduct().getId();
        this.productName = cart.getProduct().getName();
        this.imageFileName = cart.getProduct().getImageFileName();
        this.regularPrice = cart.getProduct().getRegularPrice();
        this.stockQuantity = cart.getProduct().getStockInfo().getStockQuantity();
        this.discountPercent = cart.getProduct().getDiscountPolicy().getDiscountPercent();
        this.depositPercent = cart.getProduct().getDiscountPolicy().getDepositPercent();
        this.quantity = cart.getQuantity();
    }
}