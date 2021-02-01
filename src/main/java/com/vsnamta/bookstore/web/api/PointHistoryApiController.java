package com.vsnamta.bookstore.web.api;

import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.point.PointHistoryFindPayload;
import com.vsnamta.bookstore.service.point.PointHistoryResult;
import com.vsnamta.bookstore.service.point.PointHistoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class PointHistoryApiController {
    private PointHistoryService pointHistoryService;

    @Autowired
    public PointHistoryApiController(PointHistoryService pointHistoryService) {
        this.pointHistoryService = pointHistoryService;
    }  

    @GetMapping("/api/pointHistories")
    public Page<PointHistoryResult> findAll(PointHistoryFindPayload pointHistoryFindPayload) {
        return pointHistoryService.findAll(pointHistoryFindPayload);
    }
}