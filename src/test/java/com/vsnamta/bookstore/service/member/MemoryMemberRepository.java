package com.vsnamta.bookstore.service.member;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;

public class MemoryMemberRepository implements MemberRepository {
    private Map<String, Member> map = new HashMap<>();

    @Override
    public Member save(Member member) {
        if(member.getId() == null) {
            throw new RuntimeException("아이디를 입력해주세요.");
        }

        boolean hasDuplicatedId = map.values().stream()
            .anyMatch(m -> m.getId().equals(member.getId()));

        if(hasDuplicatedId) {
            throw new RuntimeException("아이디 중복 오류");
        }

        map.put(member.getId(), member);

        return member;
    }

    @Override
    public Optional<Member> findById(String id) {
        return Optional.ofNullable(map.get(id));
    }

    @Override
    public List<Member> findAll(SearchRequest searchRequest, PageRequest pageRequest) {
        return null;
    }

    @Override
    public long findTotalCount(SearchRequest searchRequest) {
        return 0;
    }

    @Override
    public Optional<Member> findOne(String id) {
        return null;
    }
}