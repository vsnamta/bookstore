package com.vsnamta.bookstore.domain.discount;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DiscountPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DISCOUNT_POLICY_ID")
    private Long id;

    private String name;
    private int discountPercent;
    private int depositPercent;
}