package com.vsnamta.bookstore.service.discount;

import java.util.List;

import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryDiscountPolicyRepository extends BaseMemoryRepository<DiscountPolicy>
        implements DiscountPolicyRepository {
    @Override
    public List<DiscountPolicy> findAll() {
        return null;
    }
}