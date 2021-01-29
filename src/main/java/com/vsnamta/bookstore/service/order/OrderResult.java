package com.vsnamta.bookstore.service.order;

import java.time.LocalDateTime;
import java.util.List;

import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderLine;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderResult {
    private Long id;
    private String memberName;
    private String orderLineName;    
    private int totalAmounts;
    private String statusName;
    private LocalDateTime orderDate;

    public OrderResult(Order order) {
        this.id = order.getId();
        this.memberName = order.getMember().getName();
        this.orderLineName = getOrderLineName(order.getOrderLines());
        this.totalAmounts = order.getPaymentInfo().getTotalAmounts();
        this.statusName = order.getStatusInfo().getStatus().getName();
        this.orderDate = order.getStatusHistories().get(0).getCreatedDate();
    }

    private String getOrderLineName(List<OrderLine> orderLines) {
        return orderLines.size() == 1 
            ? orderLines.get(0).getProduct().getName() 
            : orderLines.get(0).getProduct().getName() + " 외 " + (orderLines.size() - 1) + "건";
    }
}