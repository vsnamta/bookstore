package com.vsnamta.bookstore.infra.file;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockMultipartFile;

public class LocalFileStorageTest {
    private String uploadPath = "/tmp/uploadTest";
    private LocalFileStorage localFileStorage;

    @Before
    public void setUp() {
        localFileStorage = new LocalFileStorage(uploadPath);
    }

    @Test
    public void 파일_저장() throws IOException {
        // given
        MockMultipartFile multipartFile = new MockMultipartFile(
            "file", "test.jpg", "image/jpeg", new FileInputStream("src/test/resources/test.jpg")
        );

        // when
        String uploadFileName = localFileStorage.save(multipartFile);

        // then
        assertTrue(new File(uploadPath, uploadFileName).exists());
    }

    @Test
    public void 파일_삭제() throws IOException {
        // given
        MockMultipartFile multipartFile = new MockMultipartFile(
            "file", "test.jpg", "image/jpeg", new FileInputStream("src/test/resources/test.jpg")
        );

        String uploadFileName = localFileStorage.save(multipartFile);

        // when
        localFileStorage.remove(uploadFileName);

        // then
        assertFalse(new File(uploadPath, uploadFileName).exists());
    }

    @Test
    public void 파일_조회() throws IOException {
        // given
        MockMultipartFile multipartFile = new MockMultipartFile(
            "file", "test.jpg", "image/jpeg", new FileInputStream("src/test/resources/test.jpg")
        );

        String uploadFileName = localFileStorage.save(multipartFile);

        // when
        File file = localFileStorage.find(uploadFileName);

        // then
        assertTrue(file.exists());
    }
}