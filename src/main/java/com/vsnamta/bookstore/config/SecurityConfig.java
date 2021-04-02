package com.vsnamta.bookstore.config;

import com.vsnamta.bookstore.web.securiry.CustomAccessDeniedHandler;
import com.vsnamta.bookstore.web.securiry.CustomAuthenticationEntryPoint;
import com.vsnamta.bookstore.web.securiry.CustomAuthenticationFailureHandler;
import com.vsnamta.bookstore.web.securiry.CustomAuthenticationProcessingFilter;
import com.vsnamta.bookstore.web.securiry.CustomAuthenticationSuccessHandler;
import com.vsnamta.bookstore.web.securiry.CustomLogoutSuccessHandler;
import com.vsnamta.bookstore.web.securiry.CustomSecurityContextRepository;
import com.vsnamta.bookstore.web.securiry.CustomUserDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.savedrequest.NullRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserDetailService customUserDetailService;  

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.securityContext().securityContextRepository(securityContextRepository());

        http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

        http
            .logout()
                .logoutUrl("/api/logout")
                .logoutSuccessHandler(logoutSuccessHandler());

        http.addFilterAt(authenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
        http.userDetailsService(customUserDetailService);

        http.sessionManagement().disable();
        //http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        http
            .requestCache()
                .requestCache(requestCache())
            .and()
            .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint())
                .accessDeniedHandler(accessDeniedHandler());
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new CustomSecurityContextRepository();
    }
  
    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new CustomLogoutSuccessHandler();
    }

    @Bean
    public CustomAuthenticationProcessingFilter authenticationProcessingFilter() throws Exception {
        CustomAuthenticationProcessingFilter authenticationProcessingFilter = new CustomAuthenticationProcessingFilter();
        authenticationProcessingFilter.setAuthenticationManager(authenticationManagerBean());
        authenticationProcessingFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler());
        authenticationProcessingFilter.setAuthenticationFailureHandler(authenticationFailureHandler());
        
        return authenticationProcessingFilter;
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }
  
    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new CustomAuthenticationFailureHandler();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
        // return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public RequestCache requestCache() {
        return new NullRequestCache();
    } 

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new CustomAuthenticationEntryPoint();
    } 

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    } 
}