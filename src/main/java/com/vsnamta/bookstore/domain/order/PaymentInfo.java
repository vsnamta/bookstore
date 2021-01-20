package com.vsnamta.bookstore.domain.order;

import javax.persistence.Embeddable;

@Embeddable
public class PaymentInfo {
    private int totalAmounts;
    private int usedPoint;
    private int paymentAmounts;
    private int depositPoint;
}