package com.vsnamta.bookstore.web.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.FileInputStream;

import com.vsnamta.bookstore.domain.common.file.FileStorage;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
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
public class FileApiControllerTest {
    @Autowired
    private FileStorage fileStorage;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 파일_저장() throws Exception {
        // given
        MockMultipartFile multipartFile = new MockMultipartFile(
            "file", "test.jpg", "image/jpeg", new FileInputStream("src/test/resources/test.jpg")
        );

        // when
        ResultActions resultActions =
            mockMvc.perform(
                multipart("/api/files")
                    .file(multipartFile));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 파일_삭제() throws Exception {
        // given
        MockMultipartFile multipartFile = new MockMultipartFile(
            "file", "test.jpg", "image/jpeg", new FileInputStream("src/test/resources/test.jpg")
        );

        String uploadFileName = fileStorage.save(multipartFile);
        
        // when
        ResultActions resultActions =
            mockMvc.perform(
                delete("/api/files/" + uploadFileName));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());  
    }

    @WithAnonymousUser
    @Test
    public void 파일_조회() throws Exception {
        // given
        MockMultipartFile multipartFile = new MockMultipartFile(
            "file", "test.jpg", "image/jpeg", new FileInputStream("src/test/resources/test.jpg")
        );

         String uploadFileName = fileStorage.save(multipartFile);

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/files/" + uploadFileName));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());           
    }
}