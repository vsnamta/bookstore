package com.vsnamta.bookstore.service.member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginMember {
    private String id;
    private String name;
    private String role;

    public LoginMember(String id, String name, String role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}