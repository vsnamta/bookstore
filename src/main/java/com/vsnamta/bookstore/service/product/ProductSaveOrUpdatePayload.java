package com.vsnamta.bookstore.service.product;

import java.time.LocalDate;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.vsnamta.bookstore.domain.product.ProductSaveOrUpdateCommand;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductSaveOrUpdatePayload {
    @NotNull(message = "할인정책을 선택해주세요.")
    private Long discountPolicyId;

    @NotNull(message = "카테고리를 선택해주세요.")
    private Long categoryId;

    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @NotBlank(message = "저자를 입력해주세요.")
    private String author;

    @NotBlank(message = "출판사를 입력해주세요.")
    private String publisher;

    @NotNull(message = "출판일을 입력해주세요.")
    private LocalDate publishedDate;

    @NotBlank(message = "총 페이지를 입력해주세요.")
    private String totalPage;

    @NotBlank(message = "ISBN을 입력해주세요.")
    private String isbn;

    @Min(value = 1, message = "가격을 입력해주세요.")
    private int regularPrice;

    @NotBlank(message = "이미지를 선택해주세요.")
    private String imageFileName;

    @NotBlank(message = "저자 소개를 입력해주세요.")
    private String authorIntroduction;

    @NotBlank(message = "책 소개를 입력해주세요.")
    private String bookIntroduction;

    @NotBlank(message = "목차를 입력해주세요.")
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