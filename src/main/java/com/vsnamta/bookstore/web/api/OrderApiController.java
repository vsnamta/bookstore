package com.vsnamta.bookstore.web.api;

import javax.validation.Valid;

import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.common.model.SearchCriteria;
import com.vsnamta.bookstore.service.order.OrderDetailResult;
import com.vsnamta.bookstore.service.order.OrderResult;
import com.vsnamta.bookstore.service.order.OrderSavePayload;
import com.vsnamta.bookstore.service.order.OrderService;
import com.vsnamta.bookstore.service.order.OrderUpdatePayload;
import com.vsnamta.bookstore.web.securiry.AuthUser;
import com.vsnamta.bookstore.web.securiry.CustomUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/api/orders")
    public OrderDetailResult save(@Valid @RequestBody OrderSavePayload orderSavePayload, @AuthUser CustomUser customUser) {
        orderSavePayload.setMemberId(customUser.getId());

        return orderService.save(orderSavePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/api/orders/{id}")
    public OrderDetailResult update(@PathVariable Long id, @Valid @RequestBody OrderUpdatePayload orderUpdatePayload, @AuthUser CustomUser customUser) {
        return orderService.update(customUser.getId(), id, orderUpdatePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/orders/{id}")
    public OrderDetailResult findOne(@PathVariable Long id, @AuthUser CustomUser customUser) {
        return orderService.findOne(customUser.getId(), id);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/orders")
    public Page<OrderResult> findAll(@Valid FindPayload findPayload, @AuthUser CustomUser customUser) {
        if(customUser.hasUserRole() && !validateUserSearchCriteria(customUser, findPayload.getSearchCriteria())) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }
        
        return orderService.findAll(findPayload);
    }

    private boolean validateUserSearchCriteria(CustomUser customUser, SearchCriteria searchCriteria) {
        if(searchCriteria.getColumn() == null || searchCriteria.getKeyword() == null) {
            return false;
        }

        return searchCriteria.getColumn().equals("memberId") 
            && searchCriteria.getKeyword().equals(String.valueOf(customUser.getId()));
    }
}