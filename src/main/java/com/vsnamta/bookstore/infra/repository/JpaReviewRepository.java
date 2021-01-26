package com.vsnamta.bookstore.infra.repository;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
}