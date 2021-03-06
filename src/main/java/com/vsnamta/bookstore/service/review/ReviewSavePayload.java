package com.vsnamta.bookstore.service.review;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewSavePayload {
    private String memberId;

    @NotNull(message = "상품을 선택해주세요.")
    private Long productId;

    @Min(value = 1, message = "평점을 1 이상 입력해주세요.")
    @Max(value = 5, message = "평점을 5 이하 입력해주세요.")
    private int rating;

    @Size(max = 30, message = "내용을 30자 이하 입력해주세요.")
    @NotBlank(message = "내용을 입력해주세요.")
    private String contents;
}