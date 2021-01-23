package com.vsnamta.bookstore.domain.point;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.vsnamta.bookstore.domain.member.Member;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PointHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POINT_HISTORY_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    
    private int amounts;
    private String contents;

    @Enumerated(EnumType.STRING)
    private PointStatus status;

    private LocalDateTime createdDate;

    @Builder
    public PointHistory(Member member, int amounts, String contents, PointStatus status, LocalDateTime createdDate) {
        this.member = member;
        this.amounts = amounts;
        this.contents = contents;
        this.status = status;
        this.createdDate = createdDate;
    }

    public static PointHistory createPointHistory(Member member, int amounts, String contents, PointStatus status) {
        return PointHistory.builder()
            .member(member)
            .amounts(amounts)
            .contents(contents)
            .status(status)
            .createdDate(LocalDateTime.now())
            .build();
    }
}