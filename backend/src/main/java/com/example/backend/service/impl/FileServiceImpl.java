package com.example.backend.service.impl;

import com.example.backend.model.FileData;
import com.example.backend.model.Task;
import com.example.backend.repository.FileRepository;
import com.example.backend.repository.TaskRepository;
import com.example.backend.service.FileService;
import com.example.backend.utils.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;

    private final TaskRepository taskRepository;

    private final EntityManager entityManager;

    public FileServiceImpl(FileRepository fileRepository, EntityManager entityManager, TaskRepository taskRepository) {
        this.fileRepository = fileRepository;
        this.entityManager = entityManager;
        this.taskRepository = taskRepository;
    }

    @Override
    public String uploadFile(MultipartFile file, Long taskId) throws IOException {
        FileData fileData = fileRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .fileData(FileUtils.compressFile(file.getBytes())).build());

        Optional<FileData> fileDataOptional = fileRepository.findById(fileData.getId());
        Optional<Task> taskOptional = taskRepository.findById(taskId);

        Task task = taskOptional.get();
        FileData fileData1 = fileDataOptional.get();
        fileData1.setAssignedTasksFile(new HashSet<>());

        task.getAssignedFiles().add(fileData1);
        fileData1.getAssignedTasksFile().add(task);

        taskRepository.save(task);

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
    public List<FileData> findFilesAssignedToTask(Long taskId) {
        String query = "SELECT * FROM files WHERE id IN " +
                "(SELECT file_id FROM files_assign_task WHERE task_id = :taskId)";

        Query nativeQuery = entityManager.createNativeQuery(query, FileData.class);
        nativeQuery.setParameter("taskId", taskId);

        return nativeQuery.getResultList();
    }

    @Override
    @Transactional
    public void deleteAssignedFileToTask(Long fileId) {
        Query query = entityManager.createNativeQuery("DELETE FROM files_assign_task WHERE file_id = :fileId");
        query.setParameter("fileId", fileId);
        query.executeUpdate();
    }

    @Override
    @Transactional
    public void deleteAllAssignedFilesToTask(Long task_id) {
        Query query = entityManager.createNativeQuery("DELETE FROM files_assign_task WHERE task_id = :task_id");
        query.setParameter("task_id", task_id);
        query.executeUpdate();
    }

}
