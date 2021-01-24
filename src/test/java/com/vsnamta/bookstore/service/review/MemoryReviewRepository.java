package com.vsnamta.bookstore.service.review;

import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.ReviewRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryReviewRepository extends BaseMemoryRepository<Review> implements ReviewRepository {
}