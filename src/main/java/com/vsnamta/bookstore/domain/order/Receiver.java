package com.vsnamta.bookstore.domain.order;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Receiver {
    @Column(name = "RECEIVER_NAME")
    private String name;

    @Column(name = "RECEIVER_PHONE_NUMBER")
    private String phoneNumber;
}