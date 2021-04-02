package com.vsnamta.bookstore.service.member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.vsnamta.bookstore.domain.common.model.Address;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MemberUpdatePayload {
    @Size(min = 8, message = "현재 비밀번호를 8자 이상 입력해주세요.")
    @Size(max = 16, message = "현재 비밀번호를 16자 이하 입력해주세요.")
    @NotBlank(message = "현재 비밀번호를 입력해주세요.")
    private String currentPassword;
    
    @Size(min = 8, message = "새로운 비밀번호를 8자 이상 입력해주세요.")
    @Size(max = 16, message = "새로운 비밀번호를 16자 이하 입력해주세요.")
    @NotBlank(message = "새로운 비밀번호를 입력해주세요.")
    private String newPassword;

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