package com.vsnamta.bookstore.config;

import com.vsnamta.bookstore.web.securiry.CustomAccessDeniedHandler;
import com.vsnamta.bookstore.web.securiry.CustomAuthenticationEntryPoint;
import com.vsnamta.bookstore.web.securiry.CustomOAuth2UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    
    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler;  
    
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .headers().frameOptions().disable()
            .and()
                .exceptionHandling()
                    .authenticationEntryPoint(customAuthenticationEntryPoint) 
                    .accessDeniedHandler(customAccessDeniedHandler)
            .and()
                .logout()
                    .logoutSuccessUrl("/logoutSuccess")
                    .deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
            .and()
                .oauth2Login()
                    .defaultSuccessUrl("/loginSuccess")
                    .userInfoEndpoint()
                        .userService(customOAuth2UserService);
    }
}