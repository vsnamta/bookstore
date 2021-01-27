package com.vsnamta.bookstore.service.member;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryMemberRepository extends BaseMemoryRepository<Member> implements MemberRepository {
    public Optional<Member> findByEmail(String email) {
        return getMap().values()
            .stream()
            .filter(member -> member.getEmail().equals(email))
            .findFirst();
    }

    @Override
    public Optional<Member> findOne(Long id) {
        return null;
    }

    @Override
    public List<Member> findAll(SearchRequest searchRequest, PageRequest pageRequest) {
        return null;
    }

    @Override
    public long findTotalCount(SearchRequest searchRequest) {
        return 0;
    }
}