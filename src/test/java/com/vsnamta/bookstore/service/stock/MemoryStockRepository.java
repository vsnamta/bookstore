package com.vsnamta.bookstore.service.stock;

import java.util.List;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.StockRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryStockRepository extends BaseMemoryRepository<Stock> implements StockRepository {
    @Override
    public List<Stock> findAll(Long productId, PageRequest pageRequest) {
        return null;
    }

    @Override
    public long findTotalCount(Long productId) {
        return 0;
    }
}