package com.vsnamta.bookstore.web.api;

import javax.validation.Valid;

import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.member.MemberDetailResult;
import com.vsnamta.bookstore.service.member.MemberResult;
import com.vsnamta.bookstore.service.member.MemberSavePayload;
import com.vsnamta.bookstore.service.member.MemberService;
import com.vsnamta.bookstore.service.member.MemberUpdatePayload;
import com.vsnamta.bookstore.service.member.MyData;
import com.vsnamta.bookstore.web.securiry.CustomUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/api/members")
    public MemberDetailResult save(@Valid @RequestBody MemberSavePayload memberSavePayload) {
        return memberService.save(memberSavePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/api/members/{id}")
    public MemberDetailResult update(@PathVariable String id, @Valid @RequestBody MemberUpdatePayload memberUpdatePayload, @AuthenticationPrincipal CustomUser customUser) {
        if(customUser.hasUserRole() && !id.equals(customUser.getId())) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }

        return memberService.update(id, memberUpdatePayload);
    }

    @GetMapping("/api/members/me")
    public MyData findMyData(@AuthenticationPrincipal Object principal) {
        if(principal instanceof CustomUser == false) {
            return null;
        }
        
        CustomUser customUser = (CustomUser)principal;

        return new MyData(
            customUser.getId(),
            customUser.getName(),
            customUser.getRole().name()
        );
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/members/{id}")
    public MemberDetailResult findOne(@PathVariable String id, @AuthenticationPrincipal CustomUser customUser) {
        if(customUser.hasUserRole() && !id.equals(customUser.getId())) {
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