package com.vsnamta.bookstore.service.cart;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartSavePayload {
    private Long memberId;
    private Long productId;
    private int quantity;
}