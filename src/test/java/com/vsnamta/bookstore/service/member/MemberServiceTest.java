package com.vsnamta.bookstore.service.member;

import static com.vsnamta.bookstore.Fixtures.aMember;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;

import org.junit.Before;
import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class MemberServiceTest {
    private MemberRepository memberRepository;
    private PasswordEncoder passwordEncoder;
    private MemberService memberService;

    @Before
    public void setUp() {
        memberRepository = new MemoryMemberRepository();
        passwordEncoder = new BCryptPasswordEncoder();
        memberService = new MemberService(memberRepository, passwordEncoder);
    }

    @Test
    public void 회원_등록() {
        // given 
        MemberSavePayload memberSavePayload = new MemberSavePayload();
        memberSavePayload.setId("test");
        memberSavePayload.setPassword("password");

        // when
        String memberId = memberService.save(memberSavePayload).getId();

        // then
        Member member = memberRepository.findById(memberId).get();

        assertEquals("test", member.getId());
        assertEquals(true, passwordEncoder.matches("password", member.getPassword()));
    }

    @Test(expected = DuplicateMemberException.class)
    public void 회원_등록시_아이디_중복_불가() {
        // given 
        memberRepository.save(aMember().id("test").build());

        MemberSavePayload memberSavePayload = new MemberSavePayload();
        memberSavePayload.setId("test");
        memberSavePayload.setPassword("password");
        memberSavePayload.setPasswordConfirm("password");

        // when
        memberService.save(memberSavePayload).getId();

        // then
        fail();
    }

    @Test(expected = InvalidArgumentException.class)
    public void 회원_등록시_비밀번호_확인_실패() {
        // given 
        MemberSavePayload memberSavePayload = new MemberSavePayload();
        memberSavePayload.setId("test");
        memberSavePayload.setPassword("password");
        memberSavePayload.setPasswordConfirm("password1");

        // when
        memberService.save(memberSavePayload).getId();

        // then
        fail();
    }

    @Test
    public void 회원_수정() {
        // given 
        Member member = memberRepository.save(
            aMember().id("test").password(passwordEncoder.encode("password")).build()
        );

        MemberUpdatePayload memberUpdatePayload = new MemberUpdatePayload();
        memberUpdatePayload.setCurrentPassword("password");
        memberUpdatePayload.setPassword("passw0rd");
        memberUpdatePayload.setPasswordConfirm("passw0rd");

        // when
        memberService.update(member.getId(), memberUpdatePayload);

        // then
        member = memberRepository.findById(member.getId()).get();

        assertEquals(true, passwordEncoder.matches("passw0rd", member.getPassword()));
    }

    @Test(expected = PasswordNotMatchingException.class)
    public void 회원_수정시_현재_비밀번호가_틀리면_실패() {
        // given 
        Member member = memberRepository.save(
            aMember().id("test").password(passwordEncoder.encode("password")).build()
        );

        MemberUpdatePayload memberUpdatePayload = new MemberUpdatePayload();
        memberUpdatePayload.setCurrentPassword("abcdefg");
        memberUpdatePayload.setPassword("passw0rd");
        memberUpdatePayload.setPasswordConfirm("passw0rd");

        // when
        memberService.update(member.getId(), memberUpdatePayload);

        // then
        fail();
    }

    @Test(expected = InvalidArgumentException.class)
    public void 회원_수정시_비밀번호_확인_실패() {
        // given 
        Member member = memberRepository.save(
            aMember().id("test").password(passwordEncoder.encode("password")).build()
        );

        MemberUpdatePayload memberUpdatePayload = new MemberUpdatePayload();
        memberUpdatePayload.setCurrentPassword("password");
        memberUpdatePayload.setPassword("passw0rd");
        memberUpdatePayload.setPasswordConfirm("passw0rd1");

        // when
        memberService.update(member.getId(), memberUpdatePayload);

        // then
        fail();
    }
}