package com.vsnamta.bookstore.infra.repository;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaDiscountPolicyRepository implements DiscountPolicyRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public DiscountPolicy save(DiscountPolicy discountPolicy) {
        entityManager.persist(discountPolicy);

        return discountPolicy;
    }

    @Override
    public Optional<DiscountPolicy> findById(Long id) {
        DiscountPolicy result = entityManager.find(DiscountPolicy.class, id);
        
        return Optional.ofNullable(result);
    }
}