package com.vsnamta.bookstore.domain.stock;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;

public interface StockRepository {
    Stock save(Stock stock);

    Optional<Stock> findById(Long id);

    List<Stock> findAll(Long productId, PageRequest pageRequest);

    long findTotalCount(Long productId);
}