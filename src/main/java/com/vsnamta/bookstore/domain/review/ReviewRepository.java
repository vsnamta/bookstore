package com.vsnamta.bookstore.domain.review;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;

public interface ReviewRepository {
    Review save(Review review);

    Optional<Review> findById(Long id);

    List<Review> findAll(SearchRequest searchRequest, PageRequest pageRequest);

    long findTotalCount(SearchRequest searchRequest);
}