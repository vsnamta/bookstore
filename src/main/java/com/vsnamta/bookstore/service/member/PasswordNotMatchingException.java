package com.vsnamta.bookstore.service.member;

public class PasswordNotMatchingException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public PasswordNotMatchingException(String message) {
        super(message);
    }
}
