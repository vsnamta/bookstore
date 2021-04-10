package com.vsnamta.bookstore.web.api;

import com.vsnamta.bookstore.service.member.MyData;
import com.vsnamta.bookstore.web.securiry.CustomUser;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class AuthApiController {
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
}
