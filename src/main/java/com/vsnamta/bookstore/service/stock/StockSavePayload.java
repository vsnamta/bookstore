package com.vsnamta.bookstore.service.stock;

import com.vsnamta.bookstore.domain.stock.StockStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StockSavePayload {
    private Long productId;
    private int quantity;
    private String contents;
    private StockStatus status;
}