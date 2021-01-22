package com.vsnamta.bookstore.domain.discount;

import java.util.Optional;

public interface DiscountPolicyRepository {
    DiscountPolicy save(DiscountPolicy discountPolicy);

    Optional<DiscountPolicy> findById(Long id);
}