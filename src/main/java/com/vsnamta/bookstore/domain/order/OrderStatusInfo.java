package com.vsnamta.bookstore.domain.order;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class OrderStatusInfo {
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "STATUS_UPDATED_DATE")
    private LocalDateTime updatedDate;

    @Builder
    public OrderStatusInfo(OrderStatus status, LocalDateTime updatedDate) {
        this.status = status;
        this.updatedDate = updatedDate;
    }
}