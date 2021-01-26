package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.member.QMember.member;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.jpa.impl.JPAQueryFactory;
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
    public Optional<Member> findById(Long id) {
        Member result = entityManager.find(Member.class, id);
        
        return Optional.ofNullable(result);
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        Member result = 
            query.select(member)
                .from(member)
                .where(member.email.eq(email))
                .fetchOne();

        return Optional.ofNullable(result);
    }
}