package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.Fixtures.aMember;
import static com.vsnamta.bookstore.Fixtures.aPageRequest;
import static com.vsnamta.bookstore.Fixtures.aSearchRequest;
import static org.junit.Assert.assertEquals;

import java.util.List;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;

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
public class JpaMemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void 이름으로_회원_조회() {
        // given
        memberRepository.save(aMember().id("test").name("홍길동").build());

        // when
        List<Member> members = memberRepository.findAll(
            aSearchRequest()
                .column("name")
                .keyword("홍길동")
                .build(),
            aPageRequest().build()    
        );
        
        // then
        assertEquals(1, members.size());        
    }

    @Test
    public void 아이디로_회원_조회() {
        //given
        Member member = memberRepository.save(aMember().id("test").name("홍길동").build());

        // when
        member = memberRepository.findOne(member.getId()).get();

        // then
        assertEquals("test", member.getId());
        assertEquals("홍길동", member.getName());
    }
}