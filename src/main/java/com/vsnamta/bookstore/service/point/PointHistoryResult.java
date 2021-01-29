package com.vsnamta.bookstore.service.point;

import java.time.LocalDateTime;

import com.vsnamta.bookstore.domain.point.PointHistory;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PointHistoryResult {
    private Long id;
    private int amounts;
    private String contents;
    private String statusName;
    private LocalDateTime createdDate;

    public PointHistoryResult(PointHistory pointHistory) {
        this.id = pointHistory.getId();
        this.amounts = pointHistory.getAmounts();
        this.contents = pointHistory.getContents();
        this.statusName = pointHistory.getStatus().getName();
        this.createdDate = pointHistory.getCreatedDate();
    }
}