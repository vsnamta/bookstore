package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.Fixtures.aMember;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.member.MemberRole;
import com.vsnamta.bookstore.service.member.MemberSavePayload;
import com.vsnamta.bookstore.service.member.MemberUpdatePayload;
import com.vsnamta.bookstore.web.WithCustomUser;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
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
public class MemberApiControllerTest {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithAnonymousUser
    @Test
    public void ??????_??????() throws Exception {
        // given 
        MemberSavePayload memberSavePayload = new MemberSavePayload();
        memberSavePayload.setId("test");
        memberSavePayload.setPassword("password");
        memberSavePayload.setPasswordConfirm("password");
        memberSavePayload.setName("?????????");
        memberSavePayload.setPhoneNumber("010-1234-5678");
        memberSavePayload.setZipCode("123-456");
        memberSavePayload.setAddress1("????????? ?????? ?????? 123??????");
        memberSavePayload.setAddress2("456???");

        // when
        ResultActions resultActions =
            mockMvc.perform( 
                post("/api/members")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(memberSavePayload)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("test"))
            .andDo(print());
    }

    @WithCustomUser(id = "test", role = MemberRole.USER)
    @Test
    public void ??????_??????() throws Exception {
        // given 
        Member member = memberRepository.save(
            aMember().id("test").password(passwordEncoder.encode("password")).build()
        ); 

        MemberUpdatePayload memberUpdatePayload = new MemberUpdatePayload();
        memberUpdatePayload.setCurrentPassword("password");
        memberUpdatePayload.setPassword("passw0rd");
        memberUpdatePayload.setPasswordConfirm("passw0rd");
        memberUpdatePayload.setPhoneNumber("010-1234-5678");
        memberUpdatePayload.setZipCode("123-456");
        memberUpdatePayload.setAddress1("????????? ?????? ?????? 123??????");
        memberUpdatePayload.setAddress2("456???");

        // when
        ResultActions resultActions =
            mockMvc.perform( 
                put("/api/members/" + member.getId())
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(memberUpdatePayload)));
                    
        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("test"))
            .andDo(print());
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void ????????????_??????_??????() throws Exception {
        // given
        memberRepository.save(aMember().id("test").name("?????????").build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/members")
                    .param("searchCriteria.column", "name")
                    .param("searchCriteria.keyword", "?????????")
                    .param("pageCriteria.page", String.valueOf(1))    
                    .param("pageCriteria.size", String.valueOf(10)));

        // then
        resultActions
            .andExpect(status().isOk())
            // .andExpect(jsonPath("$.id").value("test"))
            .andDo(print());     
    }

    @WithCustomUser(id = "test", role = MemberRole.USER)
    @Test
    public void ????????????_??????_??????() throws Exception {
        // given
        Member member = memberRepository.save(aMember().id("test").name("?????????").build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/members/" + member.getId()));
                    
        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("test"))
            .andDo(print());           
    }
}