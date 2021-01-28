package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.DomainBuilder.aPageRequest;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static com.vsnamta.bookstore.DomainBuilder.aStock;
import static org.junit.Assert.assertEquals;

import java.util.List;

import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.StockRepository;
import com.vsnamta.bookstore.domain.stock.StockStatus;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Repository.class))
public class JpaStockRepositoryTest {
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ProductRepository productRepository; 

    @Test
    public void 상품번호로_재고_조회() {
        //given
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        stockRepository.save(aStock().product(product).quantity(10).status(StockStatus.PURCHASE).build());
        stockRepository.save(aStock().product(product).quantity(-1).status(StockStatus.SALES).build());

        // when
        List<Stock> stocks = stockRepository.findAll(product.getId(), aPageRequest().build());
        
        // then
        assertEquals(2, stocks.size());     
    }
}