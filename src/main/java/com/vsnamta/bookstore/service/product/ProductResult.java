package com.vsnamta.bookstore.service.product;

import java.time.LocalDate;

import com.vsnamta.bookstore.domain.product.Product;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductResult {
    private Long id;
    private String name;
    private String author;
    private String publisher;
    private LocalDate publishedDate;
    private int regularPrice;
    private String imageFileName;
    private int stockQuantity;
    private int salesQuantity;
    private Double rating;   
    private int reviewCount;
    private int discountPercent;
    private int depositPercent;

    public ProductResult(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.author = product.getAuthor();
        this.publisher = product.getPublisher();
        this.publishedDate = product.getPublishedDate();
        this.regularPrice = product.getRegularPrice();
        this.imageFileName = product.getImageFileName();
        this.stockQuantity = product.getStockInfo().getStockQuantity();
        this.salesQuantity = product.getStockInfo().getSalesQuantity();
        this.rating = product.getReviewInfo().getRating();
        this.reviewCount = product.getReviewInfo().getReviewCount();
        this.discountPercent = product.getDiscountPolicy().getDiscountPercent();
        this.depositPercent = product.getDiscountPolicy().getDepositPercent();
	}
}