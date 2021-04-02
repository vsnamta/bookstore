package com.vsnamta.bookstore.domain.member;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

import com.vsnamta.bookstore.domain.common.model.Address;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member {
    @Id
    @Column(name = "MEMBER_ID")
    private String id;

    private String password;
    private String name;
    private String phoneNumber;

    @Embedded
    private Address address;

    private int point;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    private LocalDateTime createdDate;

    @Builder
    public Member(String id, String password, String name, String phoneNumber, Address address, int point,
            MemberRole role, LocalDateTime createdDate) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.point = point;
        this.role = role;
        this.createdDate = createdDate;
    }

    public static Member createMember(String id, String password, String name, String phoneNumber, Address address) {
        return Member.builder()
            .id(id)
            .password(password)
            .name(name)
            .phoneNumber(phoneNumber)
            .address(address)
            .point(0)
            .role(MemberRole.USER)
            .createdDate(LocalDateTime.now())
            .build();
    }

    public void update(String password, String phoneNumber, Address address) {
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    public void plusPoint(int point) {
        this.point += point;
    }

    public void minusPoint(int point) {
        this.point -= point;
    }
}