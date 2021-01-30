package com.vsnamta.bookstore.domain.common.file;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorage {
    String save(MultipartFile multipartFile);

    void remove(String fileName);

    File find(String fileName);
}