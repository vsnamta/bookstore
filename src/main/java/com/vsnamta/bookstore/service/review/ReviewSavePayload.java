package com.vsnamta.bookstore.service.review;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewSavePayload {
    private Long memberId;
    private Long productId;
    private int rating;
    private String contents;
}