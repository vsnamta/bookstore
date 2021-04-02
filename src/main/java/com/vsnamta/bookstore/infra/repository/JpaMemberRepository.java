package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.member.QMember.member;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaMemberRepository implements MemberRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Member save(Member member) {
        entityManager.persist(member);
        
        return member;
    }

    @Override
    public Optional<Member> findById(String id) {
        Member result = entityManager.find(Member.class, id);
        
        return Optional.ofNullable(result);
    }

    @Override
    public Optional<Member> findOne(String id) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        Member result = 
            query.select(member)
                .from(member)
                .where(member.id.eq(id))
                .setHint("org.hibernate.readOnly", true)
                .fetchOne();

        return Optional.ofNullable(result);
    }

    @Override
    public List<Member> findAll(SearchRequest searchRequest, PageRequest pageRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Member> results = 
            query.select(member)
                .from(member)
                .where(makeSearchCondition(searchRequest))
                .orderBy(member.id.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getSize())
                .setHint("org.hibernate.readOnly", true)
                .fetch();

        return results;
    }

    @Override
    public long findTotalCount(SearchRequest searchRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);
        
        long totalCount = 
            query.select(member.id.count())
                .from(member)
                .where(makeSearchCondition(searchRequest))
                .fetchOne();

        return totalCount;
    }

    private BooleanExpression makeSearchCondition(SearchRequest searchRequest) {
        String column = searchRequest.getColumn();
        String keyword = searchRequest.getKeyword();

        if (column != null && keyword != null) {
            switch (column) {
                case "id":
                    return member.id.contains(keyword);
                case "name":
                    return member.name.contains(keyword);
            }
        }

        return null;
    }
}