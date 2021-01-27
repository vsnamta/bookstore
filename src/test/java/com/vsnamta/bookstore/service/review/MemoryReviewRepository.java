package com.vsnamta.bookstore.service.review;

import java.util.List;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.ReviewRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryReviewRepository extends BaseMemoryRepository<Review> implements ReviewRepository {
	@Override
	public List<Review> findAll(SearchRequest searchRequest, PageRequest pageRequest) {
		return null;
	}

	@Override
	public long findTotalCount(SearchRequest searchRequest) {
		return 0;
	}
}