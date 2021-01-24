package com.vsnamta.bookstore.service.discount;

import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static org.junit.Assert.assertEquals;

import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;

import org.junit.Before;
import org.junit.Test;

public class DiscountPolicyServiceTest {
    private DiscountPolicyRepository discountPolicyRepository;
    private DiscountPolicyService discountPolicyService;

    @Before
    public void setUp() {
        discountPolicyRepository = new MemoryDiscountPolicyRepository();
        
        discountPolicyService = new DiscountPolicyService(discountPolicyRepository);
    }

    @Test
    public void 할인정책_저장() {
        // given  
        DiscountPolicySaveOrUpdatePayload discountPolicySaveOrUpdatePayload = new DiscountPolicySaveOrUpdatePayload();
        discountPolicySaveOrUpdatePayload.setName("기본");
        discountPolicySaveOrUpdatePayload.setDiscountPercent(10);
        discountPolicySaveOrUpdatePayload.setDepositPercent(5);

        // when
        Long discountPolicyId = discountPolicyService.save(discountPolicySaveOrUpdatePayload);

        // then
        DiscountPolicy discountPolicy = discountPolicyRepository.findById(discountPolicyId).get();

        assertEquals("기본", discountPolicy.getName());
        assertEquals(10, discountPolicy.getDiscountPercent());
        assertEquals(5, discountPolicy.getDepositPercent());
    }

    @Test
    public void 할인정책_수정() {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(
            aDiscountPolicy()
                .discountPercent(5)
                .depositPercent(3)
                .build()
        );
        
        DiscountPolicySaveOrUpdatePayload discountPolicySaveOrUpdatePayload = new DiscountPolicySaveOrUpdatePayload();
        discountPolicySaveOrUpdatePayload.setDiscountPercent(10);
        discountPolicySaveOrUpdatePayload.setDepositPercent(5);

        // when
        discountPolicyService.update(discountPolicy.getId(), discountPolicySaveOrUpdatePayload);

        // then
        discountPolicy = discountPolicyRepository.findById(discountPolicy.getId()).get();

        assertEquals(10, discountPolicy.getDiscountPercent());
        assertEquals(5, discountPolicy.getDepositPercent());
    }
}