package com.vsnamta.bookstore.service.common.model;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Page<T> {
    private List<T> list;
    private long totalCount;

    public Page(List<T> list, long totalCount) {
        this.list = list;
        this.totalCount = totalCount;
    }
}