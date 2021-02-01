package com.vsnamta.bookstore.web.api;

import javax.servlet.http.HttpSession;

import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.member.LoginMember;
import com.vsnamta.bookstore.service.member.MemberDetailResult;
import com.vsnamta.bookstore.service.member.MemberResult;
import com.vsnamta.bookstore.service.member.MemberService;
import com.vsnamta.bookstore.service.member.MemberUpdatePayload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class MemberApiController {
    private MemberService memberService;

    @Autowired
    public MemberApiController(MemberService memberService) {
        this.memberService = memberService;
    } 

    @PutMapping("/api/members/{id}")
    public Long update(@PathVariable Long id, @RequestBody MemberUpdatePayload memberUpdatePayload) {
        return memberService.update(id, memberUpdatePayload);
    }

    @GetMapping("/api/members/me")
    public LoginMember findMyData(HttpSession httpSession) {
        return (LoginMember)httpSession.getAttribute("loginMember");
    }

    @GetMapping("/api/members/{id}")
    public MemberDetailResult findOne(@PathVariable Long id) {
        return memberService.findOne(id);
    }

    @GetMapping("/api/members")
    public Page<MemberResult> findAll(FindPayload findPayload) {
        return memberService.findAll(findPayload);
    }
}