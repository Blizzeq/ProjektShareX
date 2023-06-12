package com.example.backend.service;

import com.example.backend.model.FileData;
import com.example.backend.model.User;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

public interface FileService {
    String uploadFile(MultipartFile file, Long taskId) throws IOException;

    byte[] downloadFile(String fileName);

    List<FileData> findFilesAssignedToTask(Long taskId);

    @Transactional
    void deleteAssignedFileToTask(Long fileId);

    @Transactional
    void deleteAllAssignedFilesToTask(Long task_id);
}
