package com.vsnamta.bookstore.service.common.exception;

public class DataNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public DataNotFoundException(String message) {
        super(message);
    }
}