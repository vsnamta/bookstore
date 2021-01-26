package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.product.QProduct.product;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaProductRepository implements ProductRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Product save(Product product) {
        entityManager.persist(product);

        return product;
    }

    @Override
    public Optional<Product> findById(Long id) {
        Product result = entityManager.find(Product.class, id);
        
        return Optional.ofNullable(result);
    }

    @Override
    public long findTotalCount(Long categoryId) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        long totalCount = 
            query.select(product.id.count())
                .from(product)
                .where(product.category.id.eq(categoryId))
                .fetchOne();

        return totalCount;
    }

    @Override
    public List<Product> findByIds(List<Long> ids) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Product> result = 
            query.select(product)
                .from(product)
                .where(product.id.in(ids))
                .fetch();

        return result;
    }
}