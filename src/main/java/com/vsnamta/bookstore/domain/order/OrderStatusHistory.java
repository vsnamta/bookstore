package com.vsnamta.bookstore.domain.order;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class OrderStatusHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_STATUS_HISTORY_ID")
    private Long id;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private LocalDateTime createdDate;

    @Builder
    public OrderStatusHistory(OrderStatus status, LocalDateTime createdDate) {
        this.status = status;
        this.createdDate = createdDate;
    }

    public static OrderStatusHistory createOrderStatusHistory(OrderStatus status) {
        return OrderStatusHistory.builder()
            .status(status)
            .createdDate(LocalDateTime.now())
            .build();
    }
}