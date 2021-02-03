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
    private List<FieldErrorResult> fieldErrorResults = new ArrayList<>();

    public ErrorResult(String message) {
        this.message = message;
    }

    public ErrorResult(String message, List<FieldErrorResult> fieldErrorResults) {
        this.message = message;
        this.fieldErrorResults = fieldErrorResults;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class FieldErrorResult {
        private String field;
        private String message;

        public FieldErrorResult(String field, String message) {
            this.field = field;
            this.message = message;
        }
    }
}