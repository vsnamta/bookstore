package com.vsnamta.bookstore.service.order;

import java.util.List;

import com.vsnamta.bookstore.domain.common.model.Address;
import com.vsnamta.bookstore.domain.order.DeliveryInfo;
import com.vsnamta.bookstore.domain.order.Receiver;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderSavePayload {
    private Long memberId;
    private List<OrderProduct> orderProducts;
    private int usedPoint;
    private String receiverName;
    private String receiverPhoneNumber;
    private String deliveryZipCode;
    private String deliveryAddress1;
    private String deliveryAddress2;
    private String deliveryMessage;

    public DeliveryInfo createDeliveryInfo() {
        return DeliveryInfo.builder()
            .receiver(
                Receiver.builder()
                    .name(receiverName)
                    .phoneNumber(receiverPhoneNumber)
                    .build()
            )
            .address(
                Address.builder()
                    .zipCode(deliveryZipCode)
                    .address1(deliveryAddress1)
                    .address2(deliveryAddress2)
                    .build()
            )
            .message(deliveryMessage)
            .build();
    }

    @Setter
    @Getter
    public static class OrderProduct {
        private Long cartId;
        private Long productId;
        private int quantity;
    }
}