package com.vsnamta.bookstore.service.product;

import java.time.LocalDate;

import com.vsnamta.bookstore.domain.product.ProductSaveOrUpdateCommand;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductSaveOrUpdatePayload {
    private Long discountPolicyId;
    private Long categoryId;
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

    public ProductSaveOrUpdateCommand toCommand() {
        return ProductSaveOrUpdateCommand.builder()
            .name(name)
            .author(author)
            .publisher(publisher)
            .publishedDate(publishedDate)
            .totalPage(totalPage)
            .isbn(isbn)
            .regularPrice(regularPrice)
            .imageFileName(imageFileName)
            .authorIntroduction(authorIntroduction)
            .bookIntroduction(bookIntroduction)
            .tableOfContents(tableOfContents)
            .build();
    }
}