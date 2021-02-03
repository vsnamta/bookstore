package com.vsnamta.bookstore.service.product;

import javax.validation.Valid;

import com.vsnamta.bookstore.service.common.model.PageCriteria;
import com.vsnamta.bookstore.service.common.model.SearchCriteria;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductFindPayload {
    private Long categoryId;
    private SearchCriteria searchCriteria = new SearchCriteria();

    @Valid
    private PageCriteria pageCriteria = new PageCriteria();
}
