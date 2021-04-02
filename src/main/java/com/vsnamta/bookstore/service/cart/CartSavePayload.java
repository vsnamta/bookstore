package com.vsnamta.bookstore.service.cart;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartSavePayload {
    private String memberId;

    @NotNull(message = "상품을 선택해 주세요.")
    private Long productId;

    @Min(value = 1, message = "수량을 1개 이상 입력해주세요.")
    private int quantity;
}