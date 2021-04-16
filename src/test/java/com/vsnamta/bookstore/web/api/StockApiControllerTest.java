package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.Fixtures.aProduct;
import static com.vsnamta.bookstore.Fixtures.aStock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.stock.StockRepository;
import com.vsnamta.bookstore.domain.stock.StockStatus;
import com.vsnamta.bookstore.service.stock.StockSavePayload;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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
public class StockApiControllerTest {
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 재고_저장() throws Exception {
        // given
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        StockSavePayload stockSavePayload = new StockSavePayload();
        stockSavePayload.setProductId(product.getId());
        stockSavePayload.setQuantity(10);
        stockSavePayload.setContents(StockStatus.PURCHASE.getName());
        stockSavePayload.setStatus(StockStatus.PURCHASE);

        // when
        ResultActions resultActions =
            mockMvc.perform(
                post("/api/stocks")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(stockSavePayload)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.quantity").value(10))
            .andExpect(jsonPath("$.statusName").value(StockStatus.PURCHASE.name()))
            .andDo(print());
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 상품번호로_재고_조회() throws Exception {
        // given
        Product product = productRepository.save(aProduct().name("Clean Code").build());
        
        stockRepository.save(aStock().product(product).quantity(10).status(StockStatus.PURCHASE).build());
        stockRepository.save(aStock().product(product).quantity(-1).status(StockStatus.SALES).build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/stocks")
                    .param("productId", String.valueOf(product.getId()))
                    .param("pageCriteria.page", String.valueOf(1))    
                    .param("pageCriteria.size", String.valueOf(10)));

        // then
        resultActions
            .andExpect(status().isOk())
            // .andExpect()
            .andDo(print());     
    }
}