package com.vsnamta.bookstore.domain.order;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.vsnamta.bookstore.domain.member.Member;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "ORDERS")
public class Order {
    @Id
    @SequenceGenerator(name = "ORDER_SEQ_GENERATOR", sequenceName = "ORDER_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ORDER_SEQ_GENERATOR")
    @Column(name = "ORDER_ID")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ORDER_ID")
    private List<OrderLine> orderLines;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ORDER_ID")
    private List<OrderStatusHistory> statusHistories = new ArrayList<>();

    @Embedded
    private PaymentInfo paymentInfo;

    @Embedded
    private DeliveryInfo deliveryInfo;

    @Embedded
    private OrderStatusInfo statusInfo;

    @Builder
    public Order(Member member, List<OrderLine> orderLines, PaymentInfo paymentInfo, DeliveryInfo deliveryInfo) {
        this.member = member;
        this.orderLines = orderLines;
        this.paymentInfo = paymentInfo;
        this.deliveryInfo = deliveryInfo;
    }

    public static Order createOrder(Member member, List<OrderLine> orderLines, int usedPoint, 
            DeliveryInfo deliveryInfo) {
        PaymentInfo paymentInfo = createPaymentInfo(orderLines, usedPoint);

        Order order = Order.builder()
            .member(member)
            .orderLines(orderLines)
            .paymentInfo(paymentInfo)
            .deliveryInfo(deliveryInfo)
            .build();     

        return order;        
    }

    private static PaymentInfo createPaymentInfo(List<OrderLine> orderLines, int usedPoint) {
        int totalAmounts = 0;
        int depositPoint = 0;

        for(OrderLine orderLine : orderLines) {
            totalAmounts += orderLine.getAmounts();
            depositPoint += orderLine.getDepositPoint();
        }

        return PaymentInfo.builder()
            .totalAmounts(totalAmounts)
            .usedPoint(usedPoint)
            .paymentAmounts(totalAmounts - usedPoint)
            .depositPoint(depositPoint)
            .build();
    }

    public void updateStatusInfo(OrderStatusInfo statusInfo) {
        this.statusInfo = statusInfo;
        statusHistories.add(OrderStatusHistory.createOrderStatusHistory(statusInfo.getStatus()));
    }
}