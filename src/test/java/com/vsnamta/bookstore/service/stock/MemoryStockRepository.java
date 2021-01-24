package com.vsnamta.bookstore.service.stock;

import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.StockRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryStockRepository extends BaseMemoryRepository<Stock> implements StockRepository {
}