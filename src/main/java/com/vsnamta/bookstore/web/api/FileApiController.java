package com.vsnamta.bookstore.web.api;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import com.vsnamta.bookstore.domain.common.file.FileStorage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class FileApiController {
    private FileStorage fileStorage;

    @Autowired
    public FileApiController(FileStorage fileStorage) {
        this.fileStorage = fileStorage;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/files")
    public String save(MultipartFile file) {
        return fileStorage.save(file);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/api/files/{name}")
    public void remove(@PathVariable String name) {
        fileStorage.remove(name);
    }

    @GetMapping("/api/files/{name}")
    public ResponseEntity<byte[]> find(@PathVariable String name) throws IOException {
        File file = fileStorage.find(name);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(file.toPath()))
            .body(FileCopyUtils.copyToByteArray(file));
    }
}