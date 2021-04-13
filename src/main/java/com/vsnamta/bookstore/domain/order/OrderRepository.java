package com.vsnamta.bookstore.domain.order;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;

public interface OrderRepository {
    Order save(Order order);

    Optional<Order> findById(Long id);

    List<Order> findAllWillBeCompleted(PageRequest pageRequest);

    long findTotalCountWillBeCompleted();

    List<Order> findAll(SearchRequest searchRequest, PageRequest pageRequest);

    long findTotalCount(SearchRequest searchRequest);

    Optional<Order> findOne(Long id);
}