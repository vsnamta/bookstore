package com.vsnamta.bookstore.web.api;

import javax.validation.Valid;

import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.point.PointHistoryFindPayload;
import com.vsnamta.bookstore.service.point.PointHistoryResult;
import com.vsnamta.bookstore.service.point.PointHistoryService;
import com.vsnamta.bookstore.web.securiry.AuthUser;
import com.vsnamta.bookstore.web.securiry.CustomUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/pointHistories")
    public Page<PointHistoryResult> findAll(@Valid PointHistoryFindPayload pointHistoryFindPayload, @AuthUser CustomUser customUser) {
        if(customUser.hasUserRole() && !pointHistoryFindPayload.getMemberId().equals(customUser.getId())) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }

        return pointHistoryService.findAll(pointHistoryFindPayload);
    }
}