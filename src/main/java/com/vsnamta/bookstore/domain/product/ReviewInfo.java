package com.vsnamta.bookstore.domain.product;

import javax.persistence.Embeddable;

@Embeddable
public class ReviewInfo {
    private int totalRating;
    private int reviewCount;
}