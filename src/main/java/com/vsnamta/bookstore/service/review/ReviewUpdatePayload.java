package com.vsnamta.bookstore.service.review;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewUpdatePayload {
    private int rating;
    private String contents;
}