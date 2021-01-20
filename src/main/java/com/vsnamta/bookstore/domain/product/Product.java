package com.vsnamta.bookstore.domain.product;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCT_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DISCOUNT_POLICY_ID")
    private DiscountPolicy discountPolicy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    private String name;
    private String author;
    private String publisher;
    private LocalDate publishedDate;
    private String totalPage;
    private String isbn;
    private int regularPrice;
    private String imageFileName;
    private String authorIntroduction;
    private String bookIntroduction;
    private String tableOfContents;

    @Embedded
    private StockInfo stockInfo;

    @Embedded
    private ReviewInfo reviewInfo;

    private LocalDateTime createdDate;
}