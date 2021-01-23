package com.vsnamta.bookstore.domain.stock;

import lombok.Getter;

@Getter
public enum StockStatus {
    PURCHASE("상품 구매로 인한 재고 증가", 1),
    SALES("상품 판매로 인한 재고 감소", -1), 
    SALES_CANCEL("상품 판매 취소로 인한 재고 증가", 1);

    private final String name;
    private final int weighting;

    private StockStatus(String name, int weighting) {
        this.name = name;
        this.weighting = weighting;
    }
}