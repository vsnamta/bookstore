package com.vsnamta.bookstore.web.api;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.member.LoginMember;
import com.vsnamta.bookstore.service.member.MemberDetailResult;
import com.vsnamta.bookstore.service.member.MemberResult;
import com.vsnamta.bookstore.service.member.MemberService;
import com.vsnamta.bookstore.service.member.MemberUpdatePayload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/api/members/{id}")
    public MemberDetailResult update(@PathVariable Long id, @Valid @RequestBody MemberUpdatePayload memberUpdatePayload, HttpSession httpSession) {
        LoginMember loginMember = (LoginMember)httpSession.getAttribute("loginMember");

        if(loginMember.hasUserRole() && !id.equals(loginMember.getId())) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }

        return memberService.update(id, memberUpdatePayload);
    }

    @GetMapping("/api/members/me")
    public LoginMember findMyData(HttpSession httpSession) {
        return (LoginMember)httpSession.getAttribute("loginMember");
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/members/{id}")
    public MemberDetailResult findOne(@PathVariable Long id, HttpSession httpSession) {
        LoginMember loginMember = (LoginMember)httpSession.getAttribute("loginMember");

        if(loginMember.hasUserRole() && !id.equals(loginMember.getId())) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }

        return memberService.findOne(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/members")
    public Page<MemberResult> findAll(@Valid FindPayload findPayload) {
        return memberService.findAll(findPayload);
    }
}