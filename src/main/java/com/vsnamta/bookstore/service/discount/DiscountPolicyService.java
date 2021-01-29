package com.vsnamta.bookstore.service.discount;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class DiscountPolicyService {
    private DiscountPolicyRepository discountPolicyRepository;

    @Autowired
    public DiscountPolicyService(DiscountPolicyRepository discountPolicyRepository) {
        this.discountPolicyRepository = discountPolicyRepository;
    }

    @Transactional
    public Long save(DiscountPolicySaveOrUpdatePayload discountPolicySaveOrUpdatePayload) {
        DiscountPolicy discountPolicy = DiscountPolicy.createDiscountPolicy(
            discountPolicySaveOrUpdatePayload.getName(),
            discountPolicySaveOrUpdatePayload.getDiscountPercent(),
            discountPolicySaveOrUpdatePayload.getDepositPercent()
        );

        return discountPolicyRepository.save(discountPolicy).getId();
    }

    @Transactional
    public Long update(Long id, DiscountPolicySaveOrUpdatePayload discountPolicySaveOrUpdatePayload) {
        DiscountPolicy discountPolicy = discountPolicyRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        discountPolicy.update(
            discountPolicySaveOrUpdatePayload.getName(),
            discountPolicySaveOrUpdatePayload.getDiscountPercent(),
            discountPolicySaveOrUpdatePayload.getDepositPercent()
        );

        return id;
    }

    @Transactional(readOnly = true)
    public List<DiscountPolicyResult> findAll() {
        return discountPolicyRepository.findAll()
            .stream()
            .map(DiscountPolicyResult::new)
            .collect(Collectors.toList());
    }
}