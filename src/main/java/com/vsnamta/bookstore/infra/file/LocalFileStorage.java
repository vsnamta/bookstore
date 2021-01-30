package com.vsnamta.bookstore.infra.file;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import com.vsnamta.bookstore.domain.common.file.FileStorage;
import com.vsnamta.bookstore.service.common.exception.DataNotFoundException;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class LocalFileStorage implements FileStorage {
    private String uploadPath;

    public LocalFileStorage (@Value("${app.upload-path}") String uploadPath) {
        File uploadDirectory = new File(uploadPath);

		if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }
        
        this.uploadPath = uploadPath;
    }

    @Override
    public String save(MultipartFile multipartFile) {
        String uploadFileName = makeId() + getExtension(multipartFile.getOriginalFilename());

        File file = new File(uploadPath, uploadFileName);

        try {
            FileCopyUtils.copy(multipartFile.getBytes(), file);
        } catch (IOException e) {
            throw new FileStorageException("파일 업로드에 실패하였습니다.");
        }

        return uploadFileName;
    }
    
    private String makeId() {
        return UUID.randomUUID().toString().replace("-", "") + System.currentTimeMillis();
    }

    private String getExtension(String originalFileName) {
        return originalFileName.substring(originalFileName.lastIndexOf("."));
    }

    @Override
    public void remove(String fileName) {
        File file = new File(uploadPath, fileName);

        if(!checkExistingFile(file)) {
            throw new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다.");
        }

        file.delete();
    }

    @Override
    public File find(String fileName) {
        File file = new File(uploadPath, fileName);

        if(!checkExistingFile(file)) {
            throw new DataNotFoundException("요청하신 데이터를 찾을 수 없습니다.");
        }

        return file;
    }

    private boolean checkExistingFile(File file) {
        return file.exists() && file.isFile();
    }
}