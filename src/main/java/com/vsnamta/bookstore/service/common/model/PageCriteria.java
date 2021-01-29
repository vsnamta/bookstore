package com.vsnamta.bookstore.service.common.model;

import com.vsnamta.bookstore.domain.common.model.PageRequest;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PageCriteria {
    private int page = 1;
    private int size = 10;
    private String sortColumn;
    private String sortDirection;

    public PageRequest toRequest() {
        return PageRequest.builder()
            .page(page)
            .size(size)
            .sortColumn(sortColumn)
            .sortDirection(sortDirection)
            .build();
    }
}