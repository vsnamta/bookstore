package com.vsnamta.bookstore.web;

import com.vsnamta.bookstore.web.securiry.CustomUser;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

public class WithCustomSecurityContextFactory implements WithSecurityContextFactory<WithCustomUser> {
    @Override
    public SecurityContext createSecurityContext(WithCustomUser annotation) {
        SecurityContext ctx = SecurityContextHolder.createEmptyContext();

        CustomUser user = new CustomUser(annotation.id(), annotation.name(), annotation.role());

        Authentication authentication = 
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        ctx.setAuthentication(authentication);
        
        return ctx;
    }
}
