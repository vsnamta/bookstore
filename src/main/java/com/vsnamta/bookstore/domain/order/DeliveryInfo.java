package com.vsnamta.bookstore.domain.order;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

import com.vsnamta.bookstore.domain.common.model.Address;

@Embeddable
public class DeliveryInfo {
    @Embedded
    private Receiver receiver;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "zipCode", column = @Column(name = "DELIVERY_ZIP_CODE")),
        @AttributeOverride(name = "address1", column = @Column(name = "DELIVERY_ADDRESS1")),
        @AttributeOverride(name = "address2", column = @Column(name = "DELIVERY_ADDRESS2"))
    })
    private Address address;

    @Column(name = "DELIVERY_MESSAGE")
    private String message;
}