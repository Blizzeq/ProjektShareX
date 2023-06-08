package com.example.backend.service.impl;

import com.example.backend.model.FileData;
import com.example.backend.model.User;
import com.example.backend.repository.FileRepository;
import com.example.backend.service.FileService;
import com.example.backend.utils.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;

    private final EntityManager entityManager;

    public FileServiceImpl(FileRepository fileRepository, EntityManager entityManager) {
        this.fileRepository = fileRepository;
        this.entityManager = entityManager;
    }

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        FileData fileData = fileRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .fileData(FileUtils.compressFile(file.getBytes())).build());

        if (fileData != null) {
            return "File upload successfully: " + file.getOriginalFilename();
        }

        return null;
    }

    @Override
    public byte[] downloadFile(String fileName) {
        Optional<FileData> dbFileData = fileRepository.findByName(fileName);

        byte[] file = FileUtils.decompressFile(dbFileData.get().getFileData());

        return file;
    }

    @Override
    public List<User> findFilesAssignedToTask(Long taskId) {
        String query = "SELECT * FROM files WHERE id IN " +
                "(SELECT file_id FROM files_assign_task WHERE task_id = :taskId)";

        Query nativeQuery = entityManager.createNativeQuery(query, FileData.class);
        nativeQuery.setParameter("taskId", taskId);

        return nativeQuery.getResultList();
    }

}
