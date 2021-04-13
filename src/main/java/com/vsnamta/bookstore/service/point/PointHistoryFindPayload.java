package com.vsnamta.bookstore.service.point;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.vsnamta.bookstore.service.common.model.PageCriteria;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PointHistoryFindPayload {
    @NotNull(message = "회원아이디를 선택해주세요.")
    private String memberId;

    @Valid
    private PageCriteria pageCriteria = new PageCriteria();
}
