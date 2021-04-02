package com.vsnamta.bookstore.web.securiry;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lombok.Getter;
import lombok.Setter;

public class CustomAuthenticationProcessingFilter extends AbstractAuthenticationProcessingFilter {
    public CustomAuthenticationProcessingFilter() {
        super(new AntPathRequestMatcher("/api/login", "POST"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginPayload loginPayload = objectMapper.readValue(request.getReader(), LoginPayload.class);

        if(loginPayload == null || 
            (loginPayload.getId() == null || loginPayload.getPassword() == null)) {
            throw new IllegalArgumentException("아이디와 비밀번호를 입력해주세요.");
        }

        UsernamePasswordAuthenticationToken authRequest =
            new UsernamePasswordAuthenticationToken(loginPayload.getId(), loginPayload.getPassword());

        setDetails(request, authRequest);

        return getAuthenticationManager().authenticate(authRequest);
    }

    private void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {
        authRequest.setDetails(authenticationDetailsSource.buildDetails(request));
    }
}

@Setter
@Getter
class LoginPayload {
    private String id;
    private String password;
}