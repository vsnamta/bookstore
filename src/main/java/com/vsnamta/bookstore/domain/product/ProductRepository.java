package com.vsnamta.bookstore.domain.product;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;

public interface ProductRepository {
    Product save(Product product);

    Optional<Product> findById(Long id);

    List<Product> findByIds(List<Long> ids);

    long findTotalCount(Long categoryId);

    Optional<Product> findOne(Long id);

    List<Product> findAll(Long categoryId, SearchRequest searchRequest, PageRequest pageRequest);

    long findTotalCount(Long categoryId, SearchRequest searchRequest);
}