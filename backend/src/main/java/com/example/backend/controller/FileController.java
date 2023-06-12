package com.example.backend.controller;

import com.example.backend.model.FileData;
import com.example.backend.model.Task;
import com.example.backend.model.User;
import com.example.backend.repository.FileRepository;
import com.example.backend.service.FileService;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Optional;

@RestController
@RequestMapping("/api/file")
public class FileController {

    private final FileService fileService;

    private final TaskService taskService;

    private final FileRepository fileRepository;

    public FileController(FileService fileService, FileRepository fileRepository, TaskService taskService) {
        this.fileService = fileService;
        this.fileRepository = fileRepository;
        this.taskService = taskService;
    }

    @PostMapping("/add/{taskId}")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("taskId") Long taskId) throws IOException {
        String uploadFile = fileService.uploadFile(file, taskId);

        return ResponseEntity.status(HttpStatus.OK).body(uploadFile);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileName) throws IOException {
        byte[] fileData = fileService.downloadFile(fileName);

        Optional<FileData> fileDataOptional = fileRepository.findByName(fileName);
        FileData fileData2 = fileDataOptional.get();

        String contentType = fileData2.getType();

        System.out.println("CONTENT TYPE");
        System.out.println(contentType);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(contentType))
                .body(fileData);
    }

    @PostMapping("{taskId}/assign/{fileId}")
    public ResponseEntity<String> assignFileToTask(@PathVariable("taskId") Long taskId, @PathVariable("fileId") Long fileId) {
        try {
            Optional<Task> taskOptional = taskService.findTaskById(taskId);
            Optional<FileData> fileDataOptional = fileRepository.findById(fileId);

            if (taskOptional.isEmpty() || fileDataOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Task task = taskOptional.get();
            FileData fileData = fileDataOptional.get();

            task.getAssignedFiles().add(fileData);
            fileData.getAssignedTasksFile().add(task);

            taskService.saveTask(task);

            return ResponseEntity.ok("File assigned to task successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while assigning file to task: " + e.getMessage());
        }
    }

    @GetMapping("assignedToTask/{taskId}")
    public ResponseEntity<?> getFilesListAssignedToTask(@PathVariable Long taskId) {
        return ResponseEntity.ok(fileService.findFilesAssignedToTask(taskId));
    }

    @DeleteMapping("deleteAssignedFile/{fileId}")
    public ResponseEntity<?> deleteAssignedFileToTask(@PathVariable Long fileId) {
        fileService.deleteAssignedFileToTask(fileId);

        return ResponseEntity.ok().build();
    }

}
