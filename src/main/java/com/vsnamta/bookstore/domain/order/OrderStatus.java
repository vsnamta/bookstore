package com.vsnamta.bookstore.domain.order;

import lombok.Getter;

@Getter
public enum OrderStatus {
    ORDERED("주문 완료"), CANCELED("주문 취소"), COMPLETED("구매 확정");

    private final String name;

    private OrderStatus(String name) {
        this.name = name;
    }
}