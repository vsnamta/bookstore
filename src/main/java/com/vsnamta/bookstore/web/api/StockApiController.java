package com.vsnamta.bookstore.web.api;

import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.stock.StockFindPayload;
import com.vsnamta.bookstore.service.stock.StockResult;
import com.vsnamta.bookstore.service.stock.StockSavePayload;
import com.vsnamta.bookstore.service.stock.StockService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class StockApiController {
    private StockService stockService;

    @Autowired
    public StockApiController(StockService stockService) {
        this.stockService = stockService;
    } 

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/stocks")
    public Long save(@RequestBody StockSavePayload stockSavePayload) {
        return stockService.save(stockSavePayload);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/stocks")
    public Page<StockResult> findAll(StockFindPayload stockFindPayload) {
        return stockService.findAll(stockFindPayload);
    }
}