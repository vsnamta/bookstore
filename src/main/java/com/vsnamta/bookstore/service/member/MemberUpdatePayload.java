package com.vsnamta.bookstore.service.member;

import com.vsnamta.bookstore.domain.common.model.Address;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MemberUpdatePayload {
    private String phoneNumber;
    private String zipCode;
    private String address1;
    private String address2;

    public Address createAddress() {
        return Address.builder()
            .zipCode(zipCode)
            .address1(address1)
            .address2(address2)
            .build();
    }
}