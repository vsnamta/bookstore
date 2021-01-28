package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static org.junit.Assert.assertEquals;

import java.util.List;

import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Repository.class))
public class JpaDiscountPolicyRepositoryTest {
    @Autowired
    private DiscountPolicyRepository discountPolicyRepository;
    
    @Test
    public void 할인정책_조회() {
        //given
        discountPolicyRepository.save(aDiscountPolicy().name("기본").build());

        // when
        List<DiscountPolicy> discountPolicyHistories = discountPolicyRepository.findAll();
        
        // then
        assertEquals(1, discountPolicyHistories.size());     
    }
}