package com.vsnamta.bookstore.web.api;

import java.util.List;

import com.vsnamta.bookstore.service.discount.DiscountPolicyResult;
import com.vsnamta.bookstore.service.discount.DiscountPolicySaveOrUpdatePayload;
import com.vsnamta.bookstore.service.discount.DiscountPolicyService;

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
public class DiscountPolicyApiController {
    private DiscountPolicyService discountPolicyService;

    @Autowired
    public DiscountPolicyApiController(DiscountPolicyService discountPolicyService) {
        this.discountPolicyService = discountPolicyService;
    } 

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/discountPolicies")
    public Long save(@RequestBody DiscountPolicySaveOrUpdatePayload discountPolicySaveOrUpdatePayload) {
        return discountPolicyService.save(discountPolicySaveOrUpdatePayload);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/api/discountPolicies/{id}")
    public Long update(@PathVariable Long id, @RequestBody DiscountPolicySaveOrUpdatePayload discountPolicySaveOrUpdatePayload) {
        return discountPolicyService.update(id, discountPolicySaveOrUpdatePayload);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/discountPolicies")
    public List<DiscountPolicyResult> findAll() {
        return discountPolicyService.findAll();
    }
}