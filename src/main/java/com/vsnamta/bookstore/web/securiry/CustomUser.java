package com.vsnamta.bookstore.web.securiry;

import java.util.Collection;
import java.util.Collections;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRole;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CustomUser implements UserDetails {
    private static final long serialVersionUID = 1L;

    private String id;
    private String password;
    private String name;
    private MemberRole role;

    public CustomUser(Member member) {
        this.id = member.getId();
        this.password = member.getPassword();
        this.name = member.getName();
        this.role = member.getRole();
    }

    public CustomUser(String id, String name, MemberRole role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }

    public boolean hasUserRole() {
        return role.equals(MemberRole.USER);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role.getType()));
    }

    @Override
    public String getUsername() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
