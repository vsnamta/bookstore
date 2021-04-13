package com.vsnamta.bookstore.service.cart;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartFindPayload {
    @NotNull(message = "회원아이디를 선택해주세요.")
    private String memberId;
}