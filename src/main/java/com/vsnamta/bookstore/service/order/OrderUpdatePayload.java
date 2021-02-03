package com.vsnamta.bookstore.service.order;

import javax.validation.constraints.NotNull;

import com.vsnamta.bookstore.domain.order.OrderStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderUpdatePayload {
    @NotNull(message = "상태를 선택해주세요.")
    private OrderStatus status;
}