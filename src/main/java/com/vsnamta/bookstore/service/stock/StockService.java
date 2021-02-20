package com.vsnamta.bookstore.service.stock;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.StockRepository;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;
import com.vsnamta.bookstore.service.common.model.Page;

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
    public StockResult save(StockSavePayload stockSavePayload) {
        Product product = productRepository.findById(stockSavePayload.getProductId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        product.plusStockQuantityByPurchase(stockSavePayload.getQuantity());    

        Stock stock = Stock.createStock(product, stockSavePayload.getQuantity(), stockSavePayload.getContents(), stockSavePayload.getStatus());
        stockRepository.save(stock);

        return new StockResult(stock);
    }

    @Transactional(readOnly = true)
    public Page<StockResult> findAll(StockFindPayload stockFindPayload) {
        Long productId = stockFindPayload.getProductId();
        PageRequest pageRequest = stockFindPayload.getPageCriteria().toRequest();
        
        List<StockResult> stockResults = 
            stockRepository.findAll(productId, pageRequest)
                .stream()
                .map(StockResult::new)
                .collect(Collectors.toList());

        long totalCount = stockRepository.findTotalCount(productId);
    
        return new Page<StockResult>(stockResults, totalCount);
    }
}