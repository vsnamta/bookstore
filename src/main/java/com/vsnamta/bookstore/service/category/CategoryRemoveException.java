package com.vsnamta.bookstore.service.category;

public class CategoryRemoveException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public CategoryRemoveException(String message) {
        super(message);
    }
}