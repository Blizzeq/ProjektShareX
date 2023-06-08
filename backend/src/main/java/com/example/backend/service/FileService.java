package com.example.backend.service;

import com.example.backend.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {
    String uploadFile(MultipartFile file) throws IOException;

    byte[] downloadFile(String fileName);

    List<User> findFilesAssignedToTask(Long taskId);
}
