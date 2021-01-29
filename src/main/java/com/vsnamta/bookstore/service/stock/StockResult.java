package com.vsnamta.bookstore.service.stock;

import java.time.LocalDateTime;

import com.vsnamta.bookstore.domain.stock.Stock;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockResult {
    private Long id;
    private int quantity;
    private String contents;
    private String statusName;
    private LocalDateTime createdDate;

    public StockResult(Stock stock) {
        this.id = stock.getId();
        this.quantity = stock.getQuantity();
        this.contents = stock.getContents();
        this.statusName = stock.getStatus().getName();
        this.createdDate = stock.getCreatedDate();
    }
}