package com.vsnamta.bookstore.domain.member;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;

public interface MemberRepository {
    Member save(Member member);

    Optional<Member> findById(String id);

    List<Member> findAll(SearchRequest searchRequest, PageRequest pageRequest);

    long findTotalCount(SearchRequest searchRequest);

    Optional<Member> findOne(String id);
}