package com.vsnamta.bookstore.domain.point;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;

public interface PointHistoryRepository {
    PointHistory save(PointHistory pointHistory);

    Optional<PointHistory> findById(Long id);

    List<PointHistory> findAll(String memberId, PageRequest pageRequest);

    long findTotalCount(String memberId);
}