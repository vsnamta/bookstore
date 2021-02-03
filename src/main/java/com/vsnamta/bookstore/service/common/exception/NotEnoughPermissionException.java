package com.vsnamta.bookstore.service.common.exception;

public class NotEnoughPermissionException extends RuntimeException {
    public NotEnoughPermissionException(String message) {
        super(message);
    }
}