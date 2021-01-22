package com.vsnamta.bookstore.domain.stock;

import java.util.Optional;

public interface StockRepository {
    Stock save(Stock stock);

    Optional<Stock> findById(Long id);
}