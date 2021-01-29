package com.vsnamta.bookstore.service.discount;

import com.vsnamta.bookstore.domain.discount.DiscountPolicy;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiscountPolicyResult {
    private Long id;
    private String name;
    private int discountPercent;
    private int depositPercent;

    @Builder
    public DiscountPolicyResult(DiscountPolicy discountPolicy) {
        this.id = discountPolicy.getId();
        this.name = discountPolicy.getName();
        this.discountPercent = discountPolicy.getDiscountPercent();
        this.depositPercent = discountPolicy.getDepositPercent();
    }
}