package com.vsnamta.bookstore.domain.product;

import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class ReviewInfo {
    private int totalRating;
    private int reviewCount;

    @Builder
    public ReviewInfo(int totalRating, int reviewCount) {
        this.totalRating = totalRating;
        this.reviewCount = reviewCount;
    }

    public Double getRating() {
        if(reviewCount == 0) {
            return null;
        }

        return (double)totalRating / reviewCount;
    }
}