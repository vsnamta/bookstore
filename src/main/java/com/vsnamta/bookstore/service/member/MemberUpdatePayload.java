package com.vsnamta.bookstore.service.member;

import javax.validation.constraints.NotBlank;

import com.vsnamta.bookstore.domain.common.model.Address;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MemberUpdatePayload {
    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    private String phoneNumber;

    @NotBlank(message = "우편번호를 입력해주세요.")
    private String zipCode;

    @NotBlank(message = "주소를 입력해주세요.")
    private String address1;

    @NotBlank(message = "상세주소를 입력해주세요.")
    private String address2;

    public Address createAddress() {
        return Address.builder()
            .zipCode(zipCode)
            .address1(address1)
            .address2(address2)
            .build();
    }
}