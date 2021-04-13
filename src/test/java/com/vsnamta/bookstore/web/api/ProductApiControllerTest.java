package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.DomainBuilder.aCategory;
import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.product.ProductSaveOrUpdatePayload;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@Transactional
public class ProductApiControllerTest {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DiscountPolicyRepository discountPolicyRepository; 

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws FileNotFoundException, IOException {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 상품_저장() throws Exception {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());

        ProductSaveOrUpdatePayload productSaveOrUpdatePayload = new ProductSaveOrUpdatePayload();
        productSaveOrUpdatePayload.setDiscountPolicyId(discountPolicy.getId());
        productSaveOrUpdatePayload.setCategoryId(subCategory.getId());
        productSaveOrUpdatePayload.setIsbn("9788966260959");
        productSaveOrUpdatePayload.setName("Clean Code");
        productSaveOrUpdatePayload.setImageFileName("test.jpg");
        productSaveOrUpdatePayload.setTotalPage("584");
        productSaveOrUpdatePayload.setAuthor("로버트 C. 마틴");
        productSaveOrUpdatePayload.setAuthorIntroduction("저자 소개...");
        productSaveOrUpdatePayload.setBookIntroduction("책 소개...");
        productSaveOrUpdatePayload.setTableOfContents("목차...");
        productSaveOrUpdatePayload.setPublisher("인사이트");
        productSaveOrUpdatePayload.setPublishedDate(LocalDate.of(2013, 12, 24));
        productSaveOrUpdatePayload.setRegularPrice(33000);

        // when
        ResultActions resultActions = 
            mockMvc.perform(
                post("/api/products")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(productSaveOrUpdatePayload)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Clean Code"))
            .andExpect(jsonPath("$.author").value("로버트 C. 마틴"))
            .andDo(print());  
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 상품_수정() throws Exception {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());
        
        Product product = productRepository.save(aProduct().name("클린 코드").author("로버트 마틴").build());

        ProductSaveOrUpdatePayload productSaveOrUpdatePayload = new ProductSaveOrUpdatePayload();
        productSaveOrUpdatePayload.setDiscountPolicyId(discountPolicy.getId());
        productSaveOrUpdatePayload.setCategoryId(subCategory.getId());
        productSaveOrUpdatePayload.setIsbn("9788966260959");
        productSaveOrUpdatePayload.setName("Clean Code");
        productSaveOrUpdatePayload.setImageFileName("test.jpg");
        productSaveOrUpdatePayload.setTotalPage("584");
        productSaveOrUpdatePayload.setAuthor("로버트 C. 마틴");
        productSaveOrUpdatePayload.setAuthorIntroduction("저자 소개...");
        productSaveOrUpdatePayload.setBookIntroduction("책 소개...");
        productSaveOrUpdatePayload.setTableOfContents("목차...");
        productSaveOrUpdatePayload.setPublisher("인사이트");
        productSaveOrUpdatePayload.setPublishedDate(LocalDate.of(2013, 12, 24));
        productSaveOrUpdatePayload.setRegularPrice(33000);

        // when
        ResultActions resultActions = 
        mockMvc.perform(
            put("/api/products/" + product.getId())
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(productSaveOrUpdatePayload)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Clean Code"))
            .andExpect(jsonPath("$.author").value("로버트 C. 마틴"))
            .andDo(print());   
    }

    @WithAnonymousUser
    @Test
    public void 이름으로_상품_조회() throws Exception {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Category superCategory = categoryRepository.save(aCategory().build());
        Category subCategory = categoryRepository.save(aCategory().parent(superCategory).build());

        productRepository.save(aProduct().discountPolicy(discountPolicy).category(subCategory).name("Clean Code").build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/products")
                    .param("searchCriteria.column", "name")
                    .param("searchCriteria.keyword", "Clean Code")
                    .param("pageCriteria.page", String.valueOf(1))    
                    .param("pageCriteria.size", String.valueOf(10)));

        // then
        resultActions
            .andExpect(status().isOk())
            // .andExpect()
            .andDo(print());    
    }

    @WithAnonymousUser
    @Test
    public void 상품번호로_상품_조회() throws Exception {
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
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/products/" + product.getId()));

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Clean Code"))
            .andExpect(jsonPath("$.author").value("로버트 C. 마틴"))
            .andDo(print());    
    }
}