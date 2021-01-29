package com.vsnamta.bookstore.service.stock;

import com.vsnamta.bookstore.service.common.model.PageCriteria;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StockFindPayload {
    private Long productId;
    private PageCriteria pageCriteria = new PageCriteria();
}
