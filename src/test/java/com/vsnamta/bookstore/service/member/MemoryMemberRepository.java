package com.vsnamta.bookstore.service.member;

import java.util.Optional;

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
}