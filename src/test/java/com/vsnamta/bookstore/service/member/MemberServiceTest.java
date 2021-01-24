package com.vsnamta.bookstore.service.member;

import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static org.junit.Assert.assertEquals;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;

import org.junit.Before;
import org.junit.Test;

public class MemberServiceTest {
    private MemberRepository memberRepository;
    private MemberService memberService;

    @Before
    public void setUp() {
        memberRepository = new MemoryMemberRepository();

        memberService = new MemberService(memberRepository);
    }

    @Test
    public void 회원_수정() {
        // given 
        Member member = memberRepository.save(aMember().phoneNumber("011-1234-5678").build());

        MemberUpdatePayload memberUpdatePayload = new MemberUpdatePayload();
        memberUpdatePayload.setPhoneNumber("010-1234-5678");

        // when
        memberService.update(member.getId(), memberUpdatePayload);

        // then
        member = memberRepository.findById(member.getId()).get();

        assertEquals("010-1234-5678", member.getPhoneNumber());
    }
}