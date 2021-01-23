package com.vsnamta.bookstore.domain.stock;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.vsnamta.bookstore.domain.product.Product;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STOCK_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;
    
    private int quantity;
    private String contents;

    @Enumerated(EnumType.STRING)
    private StockStatus status;

    private LocalDateTime createdDate;

    @Builder
    public Stock(Product product, int quantity, String contents, StockStatus status, LocalDateTime createdDate) {
        this.product = product;
        this.quantity = quantity;
        this.contents = contents;
        this.status = status;
        this.createdDate = createdDate;
    }

    public static Stock createStock(Product product, int quantity, String contents, StockStatus status) {
        return Stock.builder()
            .product(product)
            .quantity(quantity)
            .contents(contents)
            .status(status)
            .createdDate(LocalDateTime.now())
            .build();
    }
}