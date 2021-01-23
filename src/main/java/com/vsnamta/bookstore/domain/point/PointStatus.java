package com.vsnamta.bookstore.domain.point;

import lombok.Getter;

@Getter
public enum PointStatus {
    BUYING_WITHDRAWAL("주문시 사용으로 인한 적립금 감소", -1),
    BUYING_DEPOSIT("구매 확정으로 인한 적립금 증가", 1),
    BUYING_CANCEL_DEPOSIT("주문취소로 인해 주문시 사용한 적립금 증가", 1);

    private final String name;
    private final int weighting;

    private PointStatus(String name, int weighting) {
        this.name = name;
        this.weighting = weighting;
    }
}