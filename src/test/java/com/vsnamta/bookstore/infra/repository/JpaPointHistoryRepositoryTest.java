package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aPageRequest;
import static com.vsnamta.bookstore.DomainBuilder.aPointHistory;
import static org.junit.Assert.assertEquals;

import java.util.List;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.point.PointHistory;
import com.vsnamta.bookstore.domain.point.PointHistoryRepository;
import com.vsnamta.bookstore.domain.point.PointStatus;

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
public class JpaPointHistoryRepositoryTest {
    @Autowired
    private PointHistoryRepository pointHistoryRepository;

    @Autowired
    private MemberRepository memberRepository;  

    @Test
    public void 회원번호로_포인트내역_조회() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());

        pointHistoryRepository.save(aPointHistory().member(member).amounts(1000).status(PointStatus.BUYING_DEPOSIT).build());
        pointHistoryRepository.save(aPointHistory().member(member).amounts(-500).status(PointStatus.BUYING_WITHDRAWAL).build());

        // when
        List<PointHistory> PointHistorys = pointHistoryRepository.findAll(member.getId(), aPageRequest().build());
        
        // then
        assertEquals(2, PointHistorys.size());        
    }
}