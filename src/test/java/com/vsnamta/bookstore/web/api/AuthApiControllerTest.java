package com.vsnamta.bookstore.web.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.vsnamta.bookstore.domain.member.MemberRole;
import com.vsnamta.bookstore.web.WithCustomUser;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
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
public class AuthApiControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithAnonymousUser
    @Test
    public void 미인증_회원은_내_정보_없음() throws Exception {
        // given

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/members/me"));
                    
        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").doesNotExist())
            .andDo(print());       
    }

    @WithCustomUser(id = "test", name = "홍길동", role = MemberRole.USER)
    @Test
    public void 인증_회원은_내_정보_있음() throws Exception {
        // given

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/members/me"));
                    
        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("test"))
            .andExpect(jsonPath("$.name").value("홍길동"))
            .andExpect(jsonPath("$.role").value("USER"))
            .andDo(print());       
    }
}
