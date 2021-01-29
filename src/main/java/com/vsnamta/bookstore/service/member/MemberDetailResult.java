package com.vsnamta.bookstore.service.member;

import java.time.LocalDateTime;

import com.vsnamta.bookstore.domain.member.Member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberDetailResult {
    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String zipCode;
    private String address1;
    private String address2;
    private int point;  
    private String roleName;
    private LocalDateTime createdDate;

    public MemberDetailResult(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.phoneNumber = member.getPhoneNumber();
        this.zipCode = member.getAddress().getZipCode();
        this.address1 = member.getAddress().getAddress1();
        this.address2 = member.getAddress().getAddress2();
        this.point = member.getPoint();
        this.roleName = member.getRole().getName();
        this.createdDate = member.getCreatedDate();   
    }
}