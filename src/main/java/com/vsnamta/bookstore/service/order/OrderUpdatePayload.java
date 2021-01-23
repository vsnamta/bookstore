package com.vsnamta.bookstore.service.order;

import com.vsnamta.bookstore.domain.order.OrderStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderUpdatePayload {
    private OrderStatus status;
}