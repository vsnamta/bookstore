package com.vsnamta.bookstore.service.product;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.common.exception.DataNotFoundException;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;
import com.vsnamta.bookstore.service.common.model.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class ProductService {
    private ProductRepository productRepository;
    private DiscountPolicyRepository discountPolicyRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, DiscountPolicyRepository discountPolicyRepository,
            CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.discountPolicyRepository = discountPolicyRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public ProductDetailResult save(ProductSaveOrUpdatePayload productSaveOrUpdatePayload) {
        Category category = categoryRepository.findById(productSaveOrUpdatePayload.getCategoryId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));        

        DiscountPolicy discountPolicy = discountPolicyRepository.findById(productSaveOrUpdatePayload.getDiscountPolicyId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        Product product = Product.createProduct(discountPolicy, category, productSaveOrUpdatePayload.toCommand());
        productRepository.save(product);   

        return new ProductDetailResult(product);  
    }

    @Transactional
    public ProductDetailResult update(Long id, ProductSaveOrUpdatePayload productSaveOrUpdatePayload) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        DiscountPolicy discountPolicy = discountPolicyRepository.findById(productSaveOrUpdatePayload.getDiscountPolicyId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));
        
        Category category = categoryRepository.findById(productSaveOrUpdatePayload.getCategoryId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        product.update(discountPolicy, category, productSaveOrUpdatePayload.toCommand());

        return new ProductDetailResult(product);
    }

    @Transactional(readOnly = true)
    public ProductDetailResult findOne(Long id) {
        Product product = productRepository.findOne(id)
            .orElseThrow(() -> new DataNotFoundException("요청하신 데이터를 찾을 수 없습니다."));

        return new ProductDetailResult(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductResult> findAll(ProductFindPayload productFindPayload) {
        Long categoryId = productFindPayload.getCategoryId();
        SearchRequest searchRequest = productFindPayload.getSearchCriteria().toRequest();
        PageRequest pageRequest = productFindPayload.getPageCriteria().toRequest();

        List<ProductResult> productResults = 
            productRepository.findAll(categoryId, searchRequest, pageRequest)
                .stream()
                .map(ProductResult::new)
                .collect(Collectors.toList());

        long totalCount = productRepository.findTotalCount(categoryId, searchRequest);
    
        return new Page<ProductResult>(productResults, totalCount);
    }
}