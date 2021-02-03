package com.vsnamta.bookstore.service.common.model;

import javax.validation.constraints.Min;

import com.vsnamta.bookstore.domain.common.model.PageRequest;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PageCriteria {
    @Min(value = 1, message = "페이지 번호를 1 이상 선택해주세요.")
    private int page = 1;
    
    @Min(value = 1, message = "페이지 크기를 1 이상 선택해주세요.")
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