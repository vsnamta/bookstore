package com.vsnamta.bookstore.domain.common.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SearchRequest {
    private String column;
    private String keyword;

    @Builder
    public SearchRequest(String column, String keyword) {
        this.column = column;
        this.keyword = keyword;
    }
}