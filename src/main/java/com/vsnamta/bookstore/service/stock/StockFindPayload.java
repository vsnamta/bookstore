package com.vsnamta.bookstore.service.stock;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.vsnamta.bookstore.service.common.model.PageCriteria;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StockFindPayload {
    @NotNull(message = "상품번호를 선택해주세요.")
    private Long productId;

    @Valid
    private PageCriteria pageCriteria = new PageCriteria();
}
