package com.vsnamta.bookstore.service.discount;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DiscountPolicySaveOrUpdatePayload {
    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @Min(value = 0, message = "할인율을 0% 이상 입력해주세요.")
    @Max(value = 100, message = "할인율을 100% 이하 입력해주세요.")
    private int discountPercent;

    @Min(value = 0, message = "적립률을 0% 이상 입력해주세요.")
    private int depositPercent;
}