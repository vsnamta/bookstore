package com.vsnamta.bookstore.service.member;

import java.time.LocalDateTime;

import com.vsnamta.bookstore.domain.member.Member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberResult {
    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String roleName;
    private LocalDateTime createdDate;

    public MemberResult(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.phoneNumber = member.getPhoneNumber();
        this.roleName = member.getRole().getName();
        this.createdDate = member.getCreatedDate();       
    }
}