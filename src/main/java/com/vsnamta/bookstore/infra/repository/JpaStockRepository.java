package com.vsnamta.bookstore.infra.repository;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.StockRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaStockRepository implements StockRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Stock save(Stock stock) {
        entityManager.persist(stock);

        return stock;
    }

    @Override
    public Optional<Stock> findById(Long id) {
        Stock result = entityManager.find(Stock.class, id);
        
        return Optional.ofNullable(result);
    }
}