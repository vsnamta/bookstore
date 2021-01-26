package com.vsnamta.bookstore.infra.repository;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.vsnamta.bookstore.domain.point.PointHistory;
import com.vsnamta.bookstore.domain.point.PointHistoryRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaPointHistoryRepository implements PointHistoryRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public PointHistory save(PointHistory pointHistory) {
        entityManager.persist(pointHistory);
        
        return pointHistory;
    }

    @Override
    public Optional<PointHistory> findById(Long id) {
        PointHistory result = entityManager.find(PointHistory.class, id);
        
        return Optional.ofNullable(result);
    }
}