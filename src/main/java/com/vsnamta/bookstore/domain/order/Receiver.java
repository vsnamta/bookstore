package com.vsnamta.bookstore.domain.order;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Receiver {
    @Column(name = "RECEIVER_NAME")
    private String name;

    @Column(name = "RECEIVER_PHONE_NUMBER")
    private String phoneNumber;

    @Builder
    public Receiver(String name, String phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
}