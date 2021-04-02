package com.vsnamta.bookstore.service.order;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.vsnamta.bookstore.domain.common.model.Address;
import com.vsnamta.bookstore.domain.order.DeliveryInfo;
import com.vsnamta.bookstore.domain.order.Receiver;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderSavePayload {
    private String memberId;
    
    @NotNull(message = "주문상품을 선택해주세요.")
    @Valid
    private List<OrderProduct> orderProducts;

    @Min(value = 0, message = "사용할 포인트를 0 이상 입력해주세요.")
    private int usedPoint;

    @NotBlank(message = "수신인의 이름을 입력해주세요.")
    private String receiverName;

    @NotBlank(message = "수신인의 전화번호를 입력해주세요.")
    private String receiverPhoneNumber;

    @NotBlank(message = "수신인의 우편번호를 입력해주세요.")
    private String deliveryZipCode;

    @NotBlank(message = "수신인의 주소를 입력해주세요.")
    private String deliveryAddress1;

    @NotBlank(message = "수신인의 상세주소를 입력해주세요.")
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

        @NotNull(message = "상품을 선택해주세요.")
        private Long productId;

        @Min(value = 1, message = "수량을 1개 이상 입력해주세요.")
        private int quantity;
    }
}