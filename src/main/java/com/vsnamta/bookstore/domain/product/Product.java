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

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Builder
    public Product(DiscountPolicy discountPolicy, Category category, String name, String author, String publisher,
            LocalDate publishedDate, String totalPage, String isbn, int regularPrice, String imageFileName,
            String authorIntroduction, String bookIntroduction, String tableOfContents, StockInfo stockInfo,
            ReviewInfo reviewInfo, LocalDateTime createdDate) {
        this.discountPolicy = discountPolicy;
        this.category = category;
        this.name = name;
        this.author = author;
        this.publisher = publisher;
        this.publishedDate = publishedDate;
        this.totalPage = totalPage;
        this.isbn = isbn;
        this.regularPrice = regularPrice;
        this.imageFileName = imageFileName;
        this.authorIntroduction = authorIntroduction;
        this.bookIntroduction = bookIntroduction;
        this.tableOfContents = tableOfContents;
        this.stockInfo = stockInfo;
        this.reviewInfo = reviewInfo;
        this.createdDate = createdDate;
    }

    public static Product createProduct(DiscountPolicy discountPolicy, Category category, ProductSaveOrUpdateCommand productSaveOrUpdateCommand) {
        return Product.builder()
            .discountPolicy(discountPolicy)
            .category(category)
            .name(productSaveOrUpdateCommand.getName())
            .author(productSaveOrUpdateCommand.getAuthor())
            .publisher(productSaveOrUpdateCommand.getPublisher())
            .publishedDate(productSaveOrUpdateCommand.getPublishedDate())
            .totalPage(productSaveOrUpdateCommand.getTotalPage())
            .isbn(productSaveOrUpdateCommand.getIsbn())
            .regularPrice(productSaveOrUpdateCommand.getRegularPrice())
            .imageFileName(productSaveOrUpdateCommand.getImageFileName())
            .authorIntroduction(productSaveOrUpdateCommand.getAuthorIntroduction())
            .bookIntroduction(productSaveOrUpdateCommand.getBookIntroduction())
            .tableOfContents(productSaveOrUpdateCommand.getTableOfContents())
            .stockInfo(new StockInfo())
            .reviewInfo(new ReviewInfo())
            .createdDate(LocalDateTime.now())
            .build();
    }

    public void update(DiscountPolicy discountPolicy, Category category, ProductSaveOrUpdateCommand productSaveOrUpdateCommand) {
        this.discountPolicy = discountPolicy;
        this.category = category;
        this.name = productSaveOrUpdateCommand.getName();
        this.author = productSaveOrUpdateCommand.getAuthor();
        this.publisher = productSaveOrUpdateCommand.getPublisher();
        this.publishedDate = productSaveOrUpdateCommand.getPublishedDate();
        this.totalPage = productSaveOrUpdateCommand.getTotalPage();
        this.isbn = productSaveOrUpdateCommand.getIsbn();
        this.regularPrice = productSaveOrUpdateCommand.getRegularPrice();
        this.imageFileName = productSaveOrUpdateCommand.getImageFileName();
        this.authorIntroduction = productSaveOrUpdateCommand.getAuthorIntroduction();
        this.bookIntroduction = productSaveOrUpdateCommand.getBookIntroduction();
        this.tableOfContents = productSaveOrUpdateCommand.getTableOfContents();
    }

    public int getDiscountPrice() {
        return regularPrice - discountPolicy.calculateDiscountPrice(this);
    }

    public int getDepositPoint() {
        return discountPolicy.calculateDepositPoint(this);
    }

    public void plusStockQuantityByPurchase(int quantity) {
        this.stockInfo = new StockInfo(
            stockInfo.getStockQuantity() + quantity , 
            stockInfo.getSalesQuantity()
        );
    }

    public void plusStockQuantityBySalesCancel(int quantity) {
        this.stockInfo = new StockInfo(
            stockInfo.getStockQuantity() + quantity , 
            stockInfo.getSalesQuantity() - quantity
        );
    }
   
    public void minusStockQuantityBySales(int quantity) {
        this.stockInfo = new StockInfo(
            stockInfo.getStockQuantity() - quantity , 
            stockInfo.getSalesQuantity() + quantity
        );
    }

    public void plusRatingBySaveReview(int rating) {
        this.reviewInfo = new ReviewInfo(
            reviewInfo.getTotalRating() + rating , 
            reviewInfo.getReviewCount() + 1
        );
    }

    public void plusRatingByUpdateReview(int rating) {
        this.reviewInfo = new ReviewInfo(
            reviewInfo.getTotalRating() + rating , 
            reviewInfo.getReviewCount()
        );
    }

    public void minusRatingByRemoveReview(int rating) {
        this.reviewInfo = new ReviewInfo(
            reviewInfo.getTotalRating() - rating , 
            reviewInfo.getReviewCount() - 1
        );
    }
}