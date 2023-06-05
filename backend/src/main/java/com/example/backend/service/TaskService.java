package com.example.backend.service;

import com.example.backend.model.Task;
import com.example.backend.model.User;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface TaskService {

    void deleteTaskByProjectId(Long id);

    void deleteTaskByStatusNameAndProject(Long projectId, String statusName);

    void setStatusNameByProjectAndStatusName(Long projectId, String oldStatusName, String newStatusName);

    void setStatusNameByTaskId(Long taskId, String newStatusName);

    void deleteTask(Long id);

    Optional<Task> findTaskById(Long id);

    List<Task> findTasksByProjectAndStatus(Long projectId, String statusName);

    List<Task> findTasks(Long projectId);

    List<User> findTasksByProject(Long taskId);

    @Transactional
    void deleteAssignedTasks(Long projectId, String statusName);

    @Transactional
    void deleteAssignedUsersToTasks(Long taskId);

    Task saveTask(Task task);
}
