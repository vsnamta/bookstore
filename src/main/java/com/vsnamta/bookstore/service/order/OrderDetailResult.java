package com.vsnamta.bookstore.service.order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderLine;
import com.vsnamta.bookstore.domain.order.OrderStatusHistory;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderDetailResult {
    private Long id;
    private String memberName;
    private List<OrderLineResult> orderLineResults;
    private int totalAmounts;
    private int usedPoint;
    private int depositPoint;
    private String receiverName;
    private String receiverPhoneNumber;
    private String deliveryZipCode;
    private String deliveryAddress1;
    private String deliveryAddress2;
    private String deliveryMessage; 
    private String statusName;
    private LocalDateTime statusUpdatedDate;
    private List<OrderStatusHistoryResult> statusHistoryResults;

    public OrderDetailResult(Order order) {
        this.id = order.getId();
        this.memberName = order.getMember().getName();

        this.orderLineResults = order.getOrderLines()
            .stream()
            .map(OrderLineResult::new)
            .collect(Collectors.toList());   

        this.totalAmounts = order.getPaymentInfo().getTotalAmounts();
        this.usedPoint = order.getPaymentInfo().getUsedPoint();
        this.depositPoint = order.getPaymentInfo().getDepositPoint();
        this.receiverName = order.getDeliveryInfo().getReceiver().getName();
        this.receiverPhoneNumber = order.getDeliveryInfo().getReceiver().getPhoneNumber();
        this.deliveryZipCode = order.getDeliveryInfo().getAddress().getZipCode();
        this.deliveryAddress1 = order.getDeliveryInfo().getAddress().getAddress1();
        this.deliveryAddress2 = order.getDeliveryInfo().getAddress().getAddress2();
        this.deliveryMessage = order.getDeliveryInfo().getMessage();
        this.statusName = order.getStatusInfo().getStatus().getName();
        this.statusUpdatedDate = order.getStatusInfo().getUpdatedDate();

        this.statusHistoryResults = order.getStatusHistories()
            .stream()
            .map(OrderStatusHistoryResult::new)
            .collect(Collectors.toList());     
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class OrderLineResult {
        private Long productId;
        private String productName;
        private String imageFileName;
        private int regularPrice;
        private int discountPercent;
        private int depositPercent;
        private int quantity;
        
        public OrderLineResult(OrderLine orderLine) {
            this.productId = orderLine.getProduct().getId();
            this.productName = orderLine.getProduct().getName();
            this.regularPrice = orderLine.getProduct().getRegularPrice();
            this.imageFileName = orderLine.getProduct().getImageFileName();
            this.discountPercent = orderLine.getProduct().getDiscountPolicy().getDiscountPercent();
            this.depositPercent = orderLine.getProduct().getDiscountPolicy().getDepositPercent();
            this.quantity = orderLine.getQuantity();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class OrderStatusHistoryResult {
        private String statusName;
        private LocalDateTime createdDate;
        
        public OrderStatusHistoryResult(OrderStatusHistory orderStatusHistory) {
            this.statusName = orderStatusHistory.getStatus().getName();
            this.createdDate = orderStatusHistory.getCreatedDate();
        }
    }
}