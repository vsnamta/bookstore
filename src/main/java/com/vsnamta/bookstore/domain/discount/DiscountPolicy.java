package com.vsnamta.bookstore.domain.discount;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import com.vsnamta.bookstore.domain.product.Product;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class DiscountPolicy {
    @Id
    @SequenceGenerator(name = "DISCOUNT_POLICY_SEQ_GENERATOR", sequenceName = "DISCOUNT_POLICY_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DISCOUNT_POLICY_SEQ_GENERATOR")
    @Column(name = "DISCOUNT_POLICY_ID")
    private Long id;

    private String name;
    private int discountPercent;
    private int depositPercent;

    @Builder
    public DiscountPolicy(String name, int discountPercent, int depositPercent) {
        this.name = name;
        this.discountPercent = discountPercent;
        this.depositPercent = depositPercent;
    }

    public static DiscountPolicy createDiscountPolicy(String name, int discountPercent, int depositPercent) {
        return DiscountPolicy.builder()
            .name(name)
            .discountPercent(discountPercent)
            .depositPercent(depositPercent)
            .build();
    }

    public void update(String name, int discountPercent, int depositPercent) {
        this.name = name;
        this.discountPercent = discountPercent;
        this.depositPercent = depositPercent;
    }

    public int calculateDiscountPrice(Product product) {  
        return (int)(product.getRegularPrice() * convertRate(discountPercent));
    }

    public int calculateDepositPoint(Product product) {
        return (int)(product.getRegularPrice() * convertRate(depositPercent));
    }

    private double convertRate(int percent) {
        return percent / 100.0;
    }
}