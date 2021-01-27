package com.vsnamta.bookstore.service.point;

import java.util.List;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.point.PointHistory;
import com.vsnamta.bookstore.domain.point.PointHistoryRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryPointHistoryRepository extends BaseMemoryRepository<PointHistory> implements PointHistoryRepository {
    @Override
    public List<PointHistory> findAll(Long memberId, PageRequest pageRequest) {
        return null;
    }

    @Override
    public long findTotalCount(Long memberId) {
        return 0;
    }
}