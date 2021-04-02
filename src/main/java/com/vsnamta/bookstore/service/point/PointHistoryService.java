package com.vsnamta.bookstore.service.point;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.point.PointHistoryRepository;
import com.vsnamta.bookstore.service.common.model.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class PointHistoryService {
    private PointHistoryRepository pointHistoryRepository;

    @Autowired
    public PointHistoryService(PointHistoryRepository pointHistoryRepository) {
        this.pointHistoryRepository = pointHistoryRepository;
    }

    @Transactional(readOnly = true)
    public Page<PointHistoryResult> findAll(PointHistoryFindPayload pointHistoryFindPayload) {
        String memberId = pointHistoryFindPayload.getMemberId();
        PageRequest pageRequest = pointHistoryFindPayload.getPageCriteria().toRequest();

        List<PointHistoryResult> pointHistoryResults = 
            pointHistoryRepository.findAll(memberId, pageRequest)
                .stream()
                .map(PointHistoryResult::new)
                .collect(Collectors.toList());

        long totalCount = pointHistoryRepository.findTotalCount(memberId);
    
        return new Page<PointHistoryResult>(pointHistoryResults, totalCount);
    }
}