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
}