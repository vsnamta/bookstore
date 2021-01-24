package com.vsnamta.bookstore.service.product;

import static com.vsnamta.bookstore.DomainBuilder.aCategory;
import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static org.junit.Assert.assertEquals;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.category.MemoryCategoryRepository;
import com.vsnamta.bookstore.service.discount.MemoryDiscountPolicyRepository;

import org.junit.Before;
import org.junit.Test;

public class ProductServiceTest {
    private ProductRepository productRepository;
    private DiscountPolicyRepository discountPolicyRepository;
    private CategoryRepository categoryRepository;
    private ProductService productService;

    @Before
    public void setUp() {
        productRepository = new MemoryProductRepository();
        discountPolicyRepository = new MemoryDiscountPolicyRepository();
        categoryRepository = new MemoryCategoryRepository();

        productService = new ProductService(productRepository, discountPolicyRepository, categoryRepository);
    }
    
    @Test
    public void 상품_저장() {
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());

        // given
        ProductSaveOrUpdatePayload productSaveOrUpdatePayload = new ProductSaveOrUpdatePayload();
        productSaveOrUpdatePayload.setDiscountPolicyId(discountPolicy.getId());
        productSaveOrUpdatePayload.setCategoryId(subCategory.getId());
        productSaveOrUpdatePayload.setName("Clean Code");
        productSaveOrUpdatePayload.setAuthor("로버트 C. 마틴");

        // when
        Long productId = productService.save(productSaveOrUpdatePayload);

        // then
        Product product = productRepository.findById(productId).get();

        assertEquals("Clean Code", product.getName());
        assertEquals("로버트 C. 마틴", product.getAuthor());
    }

    @Test
    public void 상품_수정() {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());
        
        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());

        Product product = productRepository.save(aProduct().name("클린 코드").author("로버트 마틴").build());

        ProductSaveOrUpdatePayload productSaveOrUpdatePayload = new ProductSaveOrUpdatePayload();
        productSaveOrUpdatePayload.setDiscountPolicyId(discountPolicy.getId());
        productSaveOrUpdatePayload.setCategoryId(subCategory.getId());
        productSaveOrUpdatePayload.setName("Clean Code");
        productSaveOrUpdatePayload.setAuthor("로버트 C. 마틴");

        // when
        productService.update(product.getId(), productSaveOrUpdatePayload);

        // then
        product = productRepository.findById(product.getId()).get();

        assertEquals("Clean Code", product.getName());
        assertEquals("로버트 C. 마틴", product.getAuthor());
    }
}