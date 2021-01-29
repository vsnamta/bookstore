package com.vsnamta.bookstore.service.review;

import java.time.LocalDateTime;

import com.vsnamta.bookstore.domain.review.Review;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewResult {
    private Long id;
    private Long memberId;
    private String memberEmail;
    private String memberName;
    private Long productId;
    private String productName;
    private String imageFileName;
    private int rating;
    private String contents;
    private LocalDateTime createdDate;

    public ReviewResult(Review review) {
        this.id = review.getId();
        this.memberId = review.getMember().getId();
        this.memberEmail = review.getMember().getEmail();
        this.memberName = review.getMember().getName();
        this.productId = review.getProduct().getId();
        this.productName = review.getProduct().getName();
        this.imageFileName = review.getProduct().getImageFileName();
        this.rating = review.getRating();
        this.contents = review.getContents();
        this.createdDate = review.getCreatedDate();
    }
}