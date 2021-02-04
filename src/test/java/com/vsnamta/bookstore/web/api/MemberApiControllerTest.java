package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.service.member.LoginMember;
import com.vsnamta.bookstore.service.member.MemberUpdatePayload;

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
public class MemberApiControllerTest {
    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithMockUser(roles="USER")
    @Test
    public void 회원_수정() throws Exception {
        // given 
        Member member = memberRepository.save(aMember().phoneNumber("011-1234-5678").build()); 

        MemberUpdatePayload memberUpdatePayload = new MemberUpdatePayload();
        memberUpdatePayload.setPhoneNumber("010-1234-5678");
        memberUpdatePayload.setZipCode("123-456");
        memberUpdatePayload.setAddress1("서울시 중구 명동 123번지");
        memberUpdatePayload.setAddress2("456호");

        // when
        ResultActions resultActions =
            mockMvc.perform( 
                put("/api/members/" + member.getId())
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(memberUpdatePayload))
                    .sessionAttr("loginMember", new LoginMember(member)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());
    }

    @Test
    public void 내_정보_조회() throws Exception {
        // given
        Member member = aMember().name("홍길동").email("test@gmail.com").build();

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/members/me")
                    .sessionAttr("loginMember", new LoginMember(member)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());       
    }

    @WithMockUser(roles="USER")
    @Test
    public void 회원번호로_회원_조회() throws Exception {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").email("test@gmail.com").build());
        
        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/members/" + member.getId())
                    .sessionAttr("loginMember", new LoginMember(member)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());           
    }

    @WithMockUser(roles="ADMIN")
    @Test
    public void 이름으로_회원_조회() throws Exception {
        // given
        memberRepository.save(aMember().name("홍길동").build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/members")
                    .param("searchCriteria.column", "name")
                    .param("searchCriteria.keyword", "홍길동")
                    .param("pageCriteria.page", String.valueOf(1))    
                    .param("pageCriteria.size", String.valueOf(10)));
        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());     
    }
}