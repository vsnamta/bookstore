package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aPointHistory;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.point.PointHistoryRepository;
import com.vsnamta.bookstore.domain.point.PointStatus;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
public class PointHistoryApiControllerTest {
    @Autowired
    private PointHistoryRepository pointHistoryRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithMockUser(roles="USER")
    @Test
    public void 회원번호로_포인트내역_조회() throws Exception {
        // given
        Member member = memberRepository.save(aMember().id("test").name("홍길동").build());

        pointHistoryRepository.save(aPointHistory().member(member).amounts(1000).status(PointStatus.BUYING_DEPOSIT).build());
        pointHistoryRepository.save(aPointHistory().member(member).amounts(-500).status(PointStatus.BUYING_WITHDRAWAL).build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/pointHistories")
                    .param("memberId", String.valueOf(member.getId()))
                    .param("pageCriteria.page", String.valueOf(1))    
                    .param("pageCriteria.size", String.valueOf(10)));
                    //.sessionAttr("loginMember", new LoginMember(member)));

        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());              
    }
}