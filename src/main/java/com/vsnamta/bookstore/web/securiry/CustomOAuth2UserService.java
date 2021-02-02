package com.vsnamta.bookstore.web.securiry;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.service.member.LoginMember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private MemberRepository memberRepository;

    @Autowired
    public CustomOAuth2UserService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        
        Map<String, Object> attributes = new DefaultOAuth2UserService().loadUser(userRequest).getAttributes();

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        if(registrationId.equals("naver")) {
            attributes = (Map<String, Object>) attributes.get("response");
            userNameAttributeName = "id";
        }

        Member member = getMember(attributes);

        HttpSession session = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest().getSession();
        session.setAttribute("loginMember", new LoginMember(member));

        return new DefaultOAuth2User(
            Collections.singleton(new SimpleGrantedAuthority(member.getRole().getType())),
            attributes,
            userNameAttributeName
        );
    }

    private Member getMember(Map<String, Object> attributes) {
        Member member = memberRepository.findByEmail((String)attributes.get("email"))
            .orElseGet(() -> 
                memberRepository.save(createMember(attributes))
            );

        return member;
    }

    private Member createMember(Map<String, Object> attributes) {
        return Member.createMember(
            (String)attributes.get("email"),
            (String)attributes.get("name")
        );
    }
}