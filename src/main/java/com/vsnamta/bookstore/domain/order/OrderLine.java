package com.vsnamta.bookstore.domain.order;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class OrderLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_LINE_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    private int price;
    private int quantity;
    private int amounts;
    private int depositPoint;

    @Builder
    public OrderLine(Product product, int price, int quantity, int amounts, int depositPoint) {
        this.product = product;
        this.price = price;
        this.quantity = quantity;
        this.amounts = amounts;
        this.depositPoint = depositPoint;
    }

    public static OrderLine createOrderLine(Product product, int quantity) {
        return OrderLine.builder()
            .product(product)
            .price(product.getDiscountPrice())
            .quantity(quantity)
            .amounts(product.getDiscountPrice() * quantity)
            .depositPoint(product.getDepositPoint() * quantity)
            .build();
    }
}