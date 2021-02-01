package com.vsnamta.bookstore.service.common.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResult {
    private String message;

    public ErrorResult(String message) {
        this.message = message;
    }
}