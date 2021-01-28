package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aPageRequest;
import static com.vsnamta.bookstore.DomainBuilder.aSearchRequest;
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
    public void 이메일로_회원_조회() {
        //given
        memberRepository.save(aMember().name("홍길동").email("test@gmail.com").build());

        // when
        Member member = memberRepository.findByEmail("test@gmail.com").get();

        // then
        assertEquals("홍길동", member.getName());
        assertEquals("test@gmail.com", member.getEmail());
    } 

    @Test
    public void 회원번호로_회원_조회() {
        //given
        Member member = memberRepository.save(aMember().name("홍길동").email("test@gmail.com").build());

        // when
        member = memberRepository.findOne(member.getId()).get();

        // then
        assertEquals("홍길동", member.getName());
        assertEquals("test@gmail.com", member.getEmail());
    }

    @Test
    public void 이름으로_회원_조회() {
        // given
        memberRepository.save(aMember().name("홍길동").build());

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
}