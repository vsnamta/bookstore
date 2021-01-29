package com.vsnamta.bookstore.service.point;

import com.vsnamta.bookstore.service.common.model.PageCriteria;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PointHistoryFindPayload {
    private Long memberId;
    private PageCriteria pageCriteria = new PageCriteria();
}
