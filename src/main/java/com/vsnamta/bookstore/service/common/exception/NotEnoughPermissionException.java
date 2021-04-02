package com.vsnamta.bookstore.service.common.exception;

public class NotEnoughPermissionException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public NotEnoughPermissionException(String message) {
        super(message);
    }
}