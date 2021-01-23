package com.vsnamta.bookstore.domain.member;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    private String email;
    private String name;
    private String phoneNumber;

    @Embedded
    private Address address;

    private int point;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    private LocalDateTime createdDate;

    @Builder
    public Member(String email, String name, String phoneNumber, Address address, int point, MemberRole role,
            LocalDateTime createdDate) {
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.point = point;
        this.role = role;
        this.createdDate = createdDate;
    }

    public static Member createMember(String email, String name) {
        return Member.builder()
            .email(email)
            .name(name)
            .phoneNumber("")
            .address(new Address("", "", ""))
            .point(0)
            .role(MemberRole.USER)
            .createdDate(LocalDateTime.now())
            .build();
    }

    public void update(String phoneNumber, Address address) {
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