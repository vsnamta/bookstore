package com.vsnamta.bookstore.domain.product;

import javax.persistence.Embeddable;

@Embeddable
public class StockInfo {
    private int stockQuantity;
    private int salesQuantity;
}