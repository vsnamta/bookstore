package com.vsnamta.bookstore.service.point;

import com.vsnamta.bookstore.domain.point.PointHistory;
import com.vsnamta.bookstore.domain.point.PointHistoryRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryPointHistoryRepository extends BaseMemoryRepository<PointHistory> implements PointHistoryRepository {
}