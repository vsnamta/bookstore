package com.vsnamta.bookstore.service.discount;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DiscountPolicySaveOrUpdatePayload {
    private String name;
    private int discountPercent;
    private int depositPercent;
}