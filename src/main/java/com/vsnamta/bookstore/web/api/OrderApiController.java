package com.vsnamta.bookstore.web.api;

import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.order.OrderDetailResult;
import com.vsnamta.bookstore.service.order.OrderResult;
import com.vsnamta.bookstore.service.order.OrderSavePayload;
import com.vsnamta.bookstore.service.order.OrderService;
import com.vsnamta.bookstore.service.order.OrderUpdatePayload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class OrderApiController {
    private OrderService orderService;

    @Autowired
    public OrderApiController(OrderService orderService) {
        this.orderService = orderService;
    } 

    @PostMapping("/api/orders")
    public Long save(@RequestBody OrderSavePayload orderSavePayload) {
        return orderService.save(orderSavePayload);
    }

    @PutMapping("/api/orders/{id}")
    public Long update(@PathVariable Long id, @RequestBody OrderUpdatePayload orderUpdatePayload) {
        return orderService.update(id, orderUpdatePayload);
    }

    @GetMapping("/api/orders/{id}")
    public OrderDetailResult findOne(@PathVariable Long id) {
        return orderService.findOne(id);
    }

    @GetMapping("/api/orders")
    public Page<OrderResult> findAll(FindPayload findPayload) {
        return orderService.findAll(findPayload);
    }
}