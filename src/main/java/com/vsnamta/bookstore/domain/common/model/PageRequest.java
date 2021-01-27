package com.vsnamta.bookstore.domain.common.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PageRequest {
    private int page;
    private int size;
    private String sortColumn;
    private String sortDirection;

    @Builder
    public PageRequest(int page, int size, String sortColumn, String sortDirection) {
        this.page = page;
        this.size = size;
        this.sortColumn = sortColumn;
        this.sortDirection = sortDirection;
    }
    
    public int getOffset() {
        return (page - 1) * size;
    }
}