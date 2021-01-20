package com.vsnamta.bookstore.domain.order;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
public class OrderStatusInfo {
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "STATUS_UPDATED_DATE")
    private LocalDateTime updatedDate;
}