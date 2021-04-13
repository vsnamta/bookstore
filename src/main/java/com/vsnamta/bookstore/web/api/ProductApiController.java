package com.vsnamta.bookstore.web.api;

import javax.validation.Valid;

import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.product.ProductDetailResult;
import com.vsnamta.bookstore.service.product.ProductFindPayload;
import com.vsnamta.bookstore.service.product.ProductResult;
import com.vsnamta.bookstore.service.product.ProductSaveOrUpdatePayload;
import com.vsnamta.bookstore.service.product.ProductService;

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
public class ProductApiController {
    private ProductService productService;

    @Autowired
    public ProductApiController(ProductService productService) {
        this.productService = productService;
    } 

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/products")
    public ProductDetailResult save(@Valid @RequestBody ProductSaveOrUpdatePayload productSaveOrUpdatePayload) {
        return productService.save(productSaveOrUpdatePayload);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/api/products/{id}")
    public ProductDetailResult update(@PathVariable Long id, @Valid @RequestBody ProductSaveOrUpdatePayload productSaveOrUpdatePayload) {
        return productService.update(id, productSaveOrUpdatePayload);
    }

    @GetMapping("/api/products")
    public Page<ProductResult> findAll(@Valid ProductFindPayload productFindPayload) {
        return productService.findAll(productFindPayload);
    }

    @GetMapping("/api/products/{id}")
    public ProductDetailResult findOne(@PathVariable Long id) {
        return productService.findOne(id);
    }
}