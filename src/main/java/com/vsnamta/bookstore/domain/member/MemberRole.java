package com.vsnamta.bookstore.domain.member;

import lombok.Getter;

@Getter
public enum MemberRole {
    ADMIN("관리자"), USER("일반 사용자");

    private final String ROLE_PREFIX = "ROLE_";
    private String name;

    private MemberRole(String name) {
        this.name = name;
    }

    public String getType() {
        return ROLE_PREFIX + name();
    }
}