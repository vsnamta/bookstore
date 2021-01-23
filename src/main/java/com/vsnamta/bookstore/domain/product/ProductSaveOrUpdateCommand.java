package com.vsnamta.bookstore.domain.product;

import java.time.LocalDate;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductSaveOrUpdateCommand {
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

    @Builder
    public ProductSaveOrUpdateCommand(String name, String author, String publisher, LocalDate publishedDate, String totalPage,
            String isbn, int regularPrice, String imageFileName, String authorIntroduction, String bookIntroduction,
            String tableOfContents) {
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
    }
}