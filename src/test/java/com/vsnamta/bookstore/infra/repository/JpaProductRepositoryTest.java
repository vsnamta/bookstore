package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.DomainBuilder.aCategory;
import static com.vsnamta.bookstore.DomainBuilder.aPageRequest;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static com.vsnamta.bookstore.DomainBuilder.aSearchRequest;
import static com.vsnamta.bookstore.DomainBuilder.aStockInfo;
import static org.junit.Assert.assertEquals;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Repository.class))
public class JpaProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DiscountPolicyRepository discountPolicyRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void 카테고리번호로_상품수_조회() {
        // given
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());
        Category subCategory = categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());
        
        productRepository.save(aProduct().name("Clean Code").category(subCategory).build());

        // when
        long totalCount = productRepository.findTotalCount(subCategory.getId());
        
        // then
        assertEquals(1, totalCount);
    }

    @Test
    public void 상품번호_여러개로_상품_조회() {
        // given
        Product product1 = productRepository.save(aProduct().name("Clean Code").build());
        Product product2 = productRepository.save(aProduct().name("리팩토링").build());

        // when
        List<Product> products = productRepository.findByIds( 
            Arrays.asList(
                product1.getId(), product2.getId()
            )  
        );
        
        // then
        assertEquals(2, products.size());
    }

    @Test
    public void 하위_카테고리번호로_상품_조회() {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());

        Category subCategory = categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());
        productRepository.save(aProduct().discountPolicy(discountPolicy).category(subCategory).name("Clean Code").build());
        
        // when
        List<Product> products = productRepository.findAll(
            subCategory.getId(),
            aSearchRequest().build(),
            aPageRequest().build()    
        );
        
        // then
        assertEquals(1, products.size());
    }

    @Test
    public void 상위_카테고리번호로_상품_조회() {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());

        Category subCategory1 = categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());
        productRepository.save(aProduct().discountPolicy(discountPolicy).category(subCategory1).name("Clean Code").build());

        Category subCategory2 =categoryRepository.save(aCategory().name("컴퓨터 수험서").parent(superCategory).build());
        productRepository.save(aProduct().discountPolicy(discountPolicy).category(subCategory2).name("정보처리기사 실기 세트").build());

        // when
        List<Product> products = productRepository.findAll(
            superCategory.getId(),
            aSearchRequest().build(),
            aPageRequest().build()    
        );
        
        // then
        assertEquals(2, products.size());
    }

    @Test
    public void 이름으로_상품_조회() {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());

        productRepository.save(aProduct().discountPolicy(discountPolicy).category(subCategory).name("Clean Code").build());

        // when
        List<Product> products = productRepository.findAll(
            null,
            aSearchRequest()
                .column("name")
                .keyword("Clean Code")
                .build(),
            aPageRequest().build()
        );
        
        // then
        assertEquals(1, products.size());
    }

    @Test
    public void 판매량_많은순으로_정렬하여_상품_조회() {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());

        productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .category(subCategory)
                .name("Clean Code")
                .stockInfo(aStockInfo().salesQuantity(10).build())
                .build()
        );

        productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .category(subCategory)
                .name("리팩토링")
                .stockInfo(aStockInfo().salesQuantity(5).build())
                .build()
        );

        // when
        List<Product> products = productRepository.findAll(
            null,
            aSearchRequest().build(),
            aPageRequest()
                .sortColumn("salesQuantity")
                .sortDirection("desc")
                .build()
        );
        
        // then
        assertEquals(2, products.size());
        assertEquals("Clean Code", products.get(0).getName());
        assertEquals("리팩토링", products.get(1).getName());
    }

    @Test
    public void 출간일_빠른순으로_정렬하여_상품_조회() {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());

        productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .category(subCategory).name("Clean Code")
                .publishedDate(LocalDate.of(2013, 12, 24))
                .build()
        );

        productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .category(subCategory)
                .name("리팩토링")
                .publishedDate(LocalDate.of(2012, 11, 9))
                .build()
        );

        // when
        List<Product> products = productRepository.findAll(
            null,
            aSearchRequest().build(),
            aPageRequest()
                .sortColumn("publishedDate")
                .sortDirection("desc")
                .build()     
        );
        
        // then
        assertEquals(2, products.size());
        assertEquals("Clean Code", products.get(0).getName());
        assertEquals("리팩토링", products.get(1).getName());
    }

    @Test
    public void 상품번호로_상품_조회() {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());

        Product product = productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .category(subCategory)
                .name("Clean Code")
                .author("로버트 C. 마틴")
                .build()
        );

        // when
        product = productRepository.findOne(product.getId()).get();

        // then
        assertEquals("Clean Code", product.getName());
        assertEquals("로버트 C. 마틴", product.getAuthor());
    }
}