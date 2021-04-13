package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.category.QCategory.category;
import static com.vsnamta.bookstore.domain.discount.QDiscountPolicy.discountPolicy;
import static com.vsnamta.bookstore.domain.product.QProduct.product;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.category.QCategory;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.product.QProduct;

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
    public List<Product> findByIds(List<Long> ids) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Product> result = 
            query.select(product)
                .from(product)
                .where(product.id.in(ids))
                .fetch();

        return result;
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
    public List<Product> findAll(Long categoryId, SearchRequest searchRequest, PageRequest pageRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Product> results = 
            query.select(product)
                .from(product)
                .join(product.discountPolicy, discountPolicy).fetchJoin()
                .where(belongsToCategory(categoryId), makeSearchCondition(searchRequest))
                .orderBy(makeOrderSpecifier(pageRequest))
                .offset(pageRequest.getOffset()).limit(pageRequest.getSize())
                .setHint("org.hibernate.readOnly", true)
                .fetch();

        return results;
    }

    @Override
    public long findTotalCount(Long categoryId, SearchRequest searchRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);
        
        long totalCount = 
            query.select(product.id.count())
                .from(product)
                .where(belongsToCategory(categoryId), makeSearchCondition(searchRequest))
                .fetchOne();

        return totalCount;
    }

    private BooleanExpression belongsToCategory(Long categoryId) {
        if(categoryId == null) {
            return null;
        }

        return product.category.id.in(
                JPAExpressions
                    .select(category.id)
                    .from(category)
                    .where(category.id.eq(categoryId)
                        .or(category.parent.id.eq(categoryId)))
                );
    }

    private BooleanExpression makeSearchCondition(SearchRequest searchRequest) {
        String column = searchRequest.getColumn();
        String keyword = searchRequest.getKeyword();

        if (column != null && keyword != null) {
            switch (column) {
                case "name":
                    return product.name.contains(keyword);
                case "author":
                    return product.author.contains(keyword);
                case "isbn":
                    return product.isbn.contains(keyword);
            }
        }
        
        return null;
    }

    private OrderSpecifier makeOrderSpecifier(PageRequest pageRequest) {
        String sortColumn = pageRequest.getSortColumn();
        String sortDirection = pageRequest.getSortDirection();

        PathBuilder<Object> path = new PathBuilder<>(Product.class, "product").get("publishedDate");
        Order order = Order.DESC;

        if(sortColumn != null && sortDirection != null) {
            switch (sortColumn) {
                case "salesQuantity":
                    path = new PathBuilder<>(Product.class, "product").get("stockInfo").get(sortColumn);
                    break;
                case "publishedDate": case "regularPrice":
                    path = new PathBuilder<>(Product.class, "product").get(sortColumn);
                    break;
            }

            order = sortDirection.equals("asc") ? Order.ASC : Order.DESC;
        }

        return new OrderSpecifier(order, path);
    }

    @Override
    public Optional<Product> findOne(Long id) {
        QProduct product = QProduct.product;
        QCategory superCategory = new QCategory("superCategory");
        QCategory subCategory = new QCategory("subCategory");

        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        Product result = 
            query.select(product)
                .from(product)
                .join(product.discountPolicy, discountPolicy).fetchJoin()
                .join(product.category, subCategory).fetchJoin()
                .join(subCategory.parent, superCategory).fetchJoin()
                .where(product.id.eq(id))
                .setHint("org.hibernate.readOnly", true)
                .fetchOne();

        return Optional.ofNullable(result);
    }
}