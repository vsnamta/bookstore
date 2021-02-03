package com.vsnamta.bookstore.service.cart;

import javax.validation.constraints.Min;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartUpdatePayload {
    @Min(value = 1, message = "수량을 1개 이상 입력해주세요.")
    private int quantity;
}