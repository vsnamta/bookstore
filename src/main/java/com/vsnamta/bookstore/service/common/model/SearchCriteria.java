package com.vsnamta.bookstore.service.common.model;

import com.vsnamta.bookstore.domain.common.model.SearchRequest;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SearchCriteria {
    private String column;
    private String keyword;

    public SearchRequest toRequest() {
        return SearchRequest.builder()
            .column(column)
            .keyword(keyword)
            .build();
    }
}