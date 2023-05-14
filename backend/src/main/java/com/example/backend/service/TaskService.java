package com.example.backend.service;

import com.example.backend.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    void deleteTaskByProjectId(Long id);

    void deleteTaskByStatusNameAndProject(Long projectId, String statusName);

    void deleteTask(Long id);

    Optional<Task> findTaskById(Long id);

    List<Task> findTasksByProjectAndStatus(Long projectId, String statusName);

    Task saveTask(Task task);

}
