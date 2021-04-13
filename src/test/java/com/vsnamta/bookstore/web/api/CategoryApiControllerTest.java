package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.DomainBuilder.aCategory;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.service.category.CategorySaveOrUpdatePayload;

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
public class CategoryApiControllerTest {
    @Autowired
    private CategoryRepository categoryRepository;

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
    public void 카테고리_저장() throws Exception {
        // given
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());

        CategorySaveOrUpdatePayload categorySaveOrUpdatePayload = new CategorySaveOrUpdatePayload();
        categorySaveOrUpdatePayload.setName("IT 전문서");
        categorySaveOrUpdatePayload.setParentId(superCategory.getId());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                post("/api/categories")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(categorySaveOrUpdatePayload)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("IT 전문서"))
            .andExpect(jsonPath("$.parentName").value("컴퓨터/IT"))
            .andDo(print());
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 카테고리_수정() throws Exception {
        // given  
        Category superCategory1 = categoryRepository.save(aCategory().name("과학/공학").build());
        Category superCategory2 = categoryRepository.save(aCategory().name("컴퓨터/IT").build());

        Category subCategory = categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory1).build());

        CategorySaveOrUpdatePayload categorySaveOrUpdatePayload = new CategorySaveOrUpdatePayload();
        categorySaveOrUpdatePayload.setName("IT 전문서");
        categorySaveOrUpdatePayload.setParentId(superCategory2.getId());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                put("/api/categories/" + subCategory.getId())
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(categorySaveOrUpdatePayload)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("IT 전문서"))
            .andExpect(jsonPath("$.parentName").value("컴퓨터/IT"))
            .andDo(print());  
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 카테고리_삭제() throws Exception {
        // given
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());
        Category subCategory = categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());

        // when
        ResultActions resultActions = 
            mockMvc.perform(
                delete("/api/categories/" + subCategory.getId()));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());    
    }

    @WithAnonymousUser
    @Test
    public void 카테고리_조회() throws Exception {
         // given
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").parent(null).build());
        
        categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());
        categoryRepository.save(aCategory().name("컴퓨터수험서").parent(superCategory).build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/categories"));

        // then
        resultActions
            .andExpect(status().isOk())
            // .andExpect(jsonPath("$[0].name").value("컴퓨터/IT"))
            // .andExpect(jsonPath("$[0].children[0].name").value("IT 전문서"))
            // .andExpect(jsonPath("$[0].children[1].name").value("컴퓨터수험서"))
            .andDo(print());
    }
}