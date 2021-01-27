package com.vsnamta.bookstore.domain.point;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;

public interface PointHistoryRepository {
    PointHistory save(PointHistory pointHistory);

    Optional<PointHistory> findById(Long id);

    List<PointHistory> findAll(Long memberId, PageRequest pageRequest);

    long findTotalCount(Long memberId);
}