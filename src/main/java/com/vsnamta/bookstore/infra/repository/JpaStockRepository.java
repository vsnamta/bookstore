package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.product.QProduct.product;
import static com.vsnamta.bookstore.domain.stock.QStock.stock;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
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

    @Override
    public List<Stock> findAll(Long productId, PageRequest pageRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Stock> results = 
            query.select(stock)
                .from(stock)
                .join(stock.product, product).fetchJoin()
                .where(stock.product.id.eq(productId))
                .orderBy(stock.id.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getSize())
                .setHint("org.hibernate.readOnly", true)
                .fetch();

        return results;
    }

    @Override
    public long findTotalCount(Long productId) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        long totalCount = 
            query.select(stock.id.count())
                .from(stock)
                .where(stock.product.id.eq(productId))
                .fetchOne();     

        return totalCount;
    }
}