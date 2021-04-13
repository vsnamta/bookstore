package com.vsnamta.bookstore.service.product;

import java.time.LocalDate;

import com.vsnamta.bookstore.domain.product.Product;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductDetailResult {
    private Long id;
    private Long superCategoryId;
    private String superCategoryName;
    private Long subCategoryId;
    private String subCategoryName;
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
    private int stockQuantity;
    private int salesQuantity;
    private Double rating;   
    private int reviewCount;
    private Long discountPolicyId;
    private String discountPolicyName;
    private int discountPercent;
    private int depositPercent;
    
    public ProductDetailResult(Product product) {
        this.id = product.getId();
        this.superCategoryId = product.getCategory().getParent().getId();
        this.superCategoryName = product.getCategory().getParent().getName();
        this.subCategoryId = product.getCategory().getId();
        this.subCategoryName = product.getCategory().getName();
        this.name = product.getName();
        this.author = product.getAuthor();
        this.publisher = product.getPublisher();
        this.publishedDate = product.getPublishedDate();
        this.totalPage = product.getTotalPage();
        this.isbn = product.getIsbn();
        this.regularPrice = product.getRegularPrice();
        this.imageFileName = product.getImageFileName();
        this.authorIntroduction = product.getAuthorIntroduction();
        this.bookIntroduction = product.getBookIntroduction();
        this.tableOfContents = product.getTableOfContents();
        this.stockQuantity = product.getStockInfo().getStockQuantity();
        this.salesQuantity = product.getStockInfo().getSalesQuantity();
        this.rating = product.getReviewInfo().getRating();
        this.reviewCount = product.getReviewInfo().getReviewCount();
        this.discountPolicyId = product.getDiscountPolicy().getId();
        this.discountPolicyName = product.getDiscountPolicy().getName();
        this.discountPercent = product.getDiscountPolicy().getDiscountPercent();
        this.depositPercent = product.getDiscountPolicy().getDepositPercent();
	}
}