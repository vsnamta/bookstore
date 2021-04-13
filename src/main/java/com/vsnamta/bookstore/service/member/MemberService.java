package com.vsnamta.bookstore.service.member;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.service.common.exception.DataNotFoundException;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;
import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class MemberService {
    private MemberRepository memberRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public MemberDetailResult save(MemberSavePayload memberSavePayload) {
        boolean isExisting = memberRepository.findById(memberSavePayload.getId()).isPresent();

        if(isExisting) {
            throw new DuplicateMemberException("이미 존재하는 아이디입니다.");
        }

        if(!memberSavePayload.validatePassword()) {
            throw new InvalidArgumentException("비밀번호를 정확히 입력해주세요.");
        }

        Member member = Member.createMember(
            memberSavePayload.getId(), 
            passwordEncoder.encode(memberSavePayload.getPassword()),
            memberSavePayload.getName(),
            memberSavePayload.getPhoneNumber(),
            memberSavePayload.createAddress()
        );

        memberRepository.save(member);

        return new MemberDetailResult(member);
    }

    @Transactional
    public MemberDetailResult update(String id, MemberUpdatePayload memberUpdatePayload) {
        Member member = memberRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        if(!passwordEncoder.matches(memberUpdatePayload.getCurrentPassword(), member.getPassword())) {
            throw new PasswordNotMatchingException("현재 비밀번호를 정확히 입력해주세요.");
        }

        if(!memberUpdatePayload.validatePassword()) {
            throw new InvalidArgumentException("비밀번호를 정확히 입력해주세요.");
        }

        member.update(
            passwordEncoder.encode(memberUpdatePayload.getPassword()),
            memberUpdatePayload.getPhoneNumber(), 
            memberUpdatePayload.createAddress()
        );

        return new MemberDetailResult(member);
    }

    @Transactional(readOnly = true)
    public Page<MemberResult> findAll(FindPayload findPayload) {
        SearchRequest searchRequest = findPayload.getSearchCriteria().toRequest();
        PageRequest pageRequest = findPayload.getPageCriteria().toRequest();

        List<MemberResult> memberResults = 
            memberRepository.findAll(searchRequest, pageRequest)
                .stream()
                .map(MemberResult::new)
                .collect(Collectors.toList());

        long totalCount = memberRepository.findTotalCount(searchRequest);
    
        return new Page<MemberResult>(memberResults, totalCount);
    }

    @Transactional(readOnly = true)
    public MemberDetailResult findOne(String id) {
        Member member = memberRepository.findOne(id)
            .orElseThrow(() -> new DataNotFoundException("요청하신 데이터를 찾을 수 없습니다."));

        return new MemberDetailResult(member);
    }
}