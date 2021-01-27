package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.point.QPointHistory.pointHistory;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
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

    @Override
    public List<PointHistory> findAll(Long memberId, PageRequest pageRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<PointHistory> results = 
            query.select(pointHistory)
                .from(pointHistory)
                .where(pointHistory.member.id.eq(memberId))
                .orderBy(pointHistory.id.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getSize())
                .setHint("org.hibernate.readOnly", true)
                .fetch();

        return results;
    }

    @Override
    public long findTotalCount(Long memberId) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        long totalCount = 
            query.select(pointHistory.id.count())
                .from(pointHistory)
                .where(pointHistory.member.id.eq(memberId))
                .fetchOne();     

        return totalCount;
    }
}