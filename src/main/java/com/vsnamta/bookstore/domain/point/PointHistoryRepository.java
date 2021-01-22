package com.vsnamta.bookstore.domain.point;

import java.util.Optional;

public interface PointHistoryRepository {
    PointHistory save(PointHistory pointHistory);

    Optional<PointHistory> findById(Long id);
}