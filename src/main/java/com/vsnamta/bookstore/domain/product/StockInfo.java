package com.vsnamta.bookstore.domain.product;

import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class StockInfo {
    private int stockQuantity;
    private int salesQuantity;

    @Builder
    public StockInfo(int stockQuantity, int salesQuantity) {
        this.stockQuantity = stockQuantity;
        this.salesQuantity = salesQuantity;
    }
}