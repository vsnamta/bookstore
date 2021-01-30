package com.vsnamta.bookstore.infra.file;

public class FileStorageException extends RuntimeException {
    public FileStorageException(String message) {
        super(message);
    }
}