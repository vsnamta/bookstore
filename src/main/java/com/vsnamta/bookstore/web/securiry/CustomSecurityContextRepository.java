package com.vsnamta.bookstore.web.securiry;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vsnamta.bookstore.util.JwtUtil;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;

public class CustomSecurityContextRepository implements SecurityContextRepository {
    @Override
    public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {
        SecurityContext ctx = SecurityContextHolder.createEmptyContext();
        
        String accessToken = getAuthCookieValue(requestResponseHolder.getRequest());

        if(accessToken != null) {
            CustomUser user = JwtUtil.extract(accessToken);

            if(user != null) {
                Authentication authentication = 
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                ctx.setAuthentication(authentication);
            }
        }

        return ctx;
    }

    private String getAuthCookieValue(HttpServletRequest httpServletRequest) {        
        Cookie[] cookies = httpServletRequest.getCookies();

        if(cookies == null) {
            return null;
        }

        for(Cookie cookie : cookies) {
            if(cookie.getName().equals("accessToken")) {
                return cookie.getValue();
            }
        }

        return null;
    }

    @Override
    public void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response) {

    }

    @Override
    public boolean containsContext(HttpServletRequest request) {
        String accessToken = getAuthCookieValue(request);

        if(accessToken == null) {
            return false;
        }

        return JwtUtil.extract(accessToken) == null ? false : true;
    }
}
