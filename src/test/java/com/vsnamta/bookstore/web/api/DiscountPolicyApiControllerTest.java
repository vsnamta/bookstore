package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.DomainBuilder.aDiscountPolicy;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.service.discount.DiscountPolicySaveOrUpdatePayload;

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
public class DiscountPolicyApiControllerTest {
    @Autowired
    private DiscountPolicyRepository discountPolicyRepository;

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
    public void 할인정책_저장() throws Exception {
        // given   
        DiscountPolicySaveOrUpdatePayload discountPolicySaveOrUpdatePayload = new DiscountPolicySaveOrUpdatePayload();
        discountPolicySaveOrUpdatePayload.setName("기본");
        discountPolicySaveOrUpdatePayload.setDiscountPercent(10);
        discountPolicySaveOrUpdatePayload.setDepositPercent(5);

        // when
        ResultActions resultActions =
            mockMvc.perform(
                post("/api/discountPolicies")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(discountPolicySaveOrUpdatePayload)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 할인정책_수정() throws Exception {
        // given
        DiscountPolicy discountPolicy = discountPolicyRepository.save(
            aDiscountPolicy()
                .discountPercent(5)
                .depositPercent(3)
                .build()
        );
        
        DiscountPolicySaveOrUpdatePayload discountPolicySaveOrUpdatePayload = new DiscountPolicySaveOrUpdatePayload();
        discountPolicySaveOrUpdatePayload.setName("기본");
        discountPolicySaveOrUpdatePayload.setDiscountPercent(10);
        discountPolicySaveOrUpdatePayload.setDepositPercent(5);

        // when
        ResultActions resultActions =
            mockMvc.perform(
                put("/api/discountPolicies/" + discountPolicy.getId())
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(discountPolicySaveOrUpdatePayload)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());   
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 할인정책_조회() throws Exception {
        // given
        discountPolicyRepository.save(aDiscountPolicy().name("기본").build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/discountPolicies"));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());     
    }
}