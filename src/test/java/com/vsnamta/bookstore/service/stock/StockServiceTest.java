package com.vsnamta.bookstore.service.stock;

import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static org.junit.Assert.assertEquals;

import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.StockRepository;
import com.vsnamta.bookstore.domain.stock.StockStatus;
import com.vsnamta.bookstore.service.product.MemoryProductRepository;

import org.junit.Before;
import org.junit.Test;

public class StockServiceTest {
    private StockRepository stockRepository;
    private ProductRepository productRepository;
    private StockService stockService;

    @Before
    public void setUp() {
        stockRepository = new MemoryStockRepository();
        productRepository = new MemoryProductRepository();

        stockService = new StockService(stockRepository, productRepository);
    }

    @Test
    public void 재고_저장() {
        // given
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        StockSavePayload stockSavePayload = new StockSavePayload();
        stockSavePayload.setProductId(product.getId());
        stockSavePayload.setQuantity(10);
        stockSavePayload.setContents(StockStatus.PURCHASE.getName());
        stockSavePayload.setStatus(StockStatus.PURCHASE);

        // when
        Long stockId = stockService.save(stockSavePayload).getId();

        // then
        Stock stock = stockRepository.findById(stockId).get();

        assertEquals("Clean Code", stock.getProduct().getName());
        assertEquals(10, stock.getQuantity());
        assertEquals(StockStatus.PURCHASE, stock.getStatus());
    }
}