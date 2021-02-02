package com.vsnamta.bookstore.service.member;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRole;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginMember {
    private Long id;
    private String email;
    private String name;
    private MemberRole role;

    public LoginMember(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.role = member.getRole();
    }
}