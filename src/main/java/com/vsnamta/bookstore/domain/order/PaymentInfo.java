package com.vsnamta.bookstore.domain.order;

import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class PaymentInfo {
    private int totalAmounts;
    private int usedPoint;
    private int paymentAmounts;
    private int depositPoint;

    @Builder
    public PaymentInfo(int totalAmounts, int usedPoint, int paymentAmounts, int depositPoint) {
        this.totalAmounts = totalAmounts;
        this.usedPoint = usedPoint;
        this.paymentAmounts = paymentAmounts;
        this.depositPoint = depositPoint;
    }
}