package com.vsnamta.bookstore.service.stock;

import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.StockRepository;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class StockService {
    private StockRepository stockRepository;
    private ProductRepository productRepository;


    @Autowired
    public StockService(StockRepository stockRepository, ProductRepository productRepository) {
        this.stockRepository = stockRepository;
        this.productRepository = productRepository;
    }   

    @Transactional
    public Long save(StockSavePayload stockSavePayload) {
        Product product = productRepository.findById(stockSavePayload.getProductId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        product.plusStockQuantityByPurchase(stockSavePayload.getQuantity());    

        Stock stock = Stock.createStock(product, stockSavePayload.getQuantity(), stockSavePayload.getContents(), stockSavePayload.getStatus());

        return stockRepository.save(stock).getId();
    }
}