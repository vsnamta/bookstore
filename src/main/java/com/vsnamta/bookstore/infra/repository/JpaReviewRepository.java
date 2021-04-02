package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.member.QMember.member;
import static com.vsnamta.bookstore.domain.product.QProduct.product;
import static com.vsnamta.bookstore.domain.review.QReview.review;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.ReviewRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaReviewRepository implements ReviewRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Review save(Review review) {
        entityManager.persist(review);

        return review;
    }

    @Override
    public Optional<Review> findById(Long id) {
        Review result = entityManager.find(Review.class, id);
        
        return Optional.ofNullable(result);
    }

    @Override
    public List<Review> findAll(SearchRequest searchRequest, PageRequest pageRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Review> results = 
            query.select(review)
                .from(review)
                .join(review.product, product).fetchJoin()
                .join(review.member, member).fetchJoin()
                .where(review.removed.eq(false), makeSearchCondition(searchRequest))
                .orderBy(review.id.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getSize())
                .setHint("org.hibernate.readOnly", true)
                .fetch();

        return results;
    }

    @Override
    public long findTotalCount(SearchRequest searchRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        long totalCount = 
            query.select(review.id.count())
                .from(review)
                .where(review.removed.eq(false), makeSearchCondition(searchRequest))
                .fetchOne();

        return totalCount;
    }

    private BooleanExpression makeSearchCondition(SearchRequest searchRequest) {
        String column = searchRequest.getColumn();
        String keyword = searchRequest.getKeyword();

        if (column != null && keyword != null) {
            switch (column) {
                case "productId":
                    return review.product.id.eq(Long.valueOf(keyword));
                case "memberId":
                    return review.member.id.eq(keyword);
            }
        }

        return null;
    }
}