package com.example.backend.service.impl;

import com.example.backend.model.Task;
import com.example.backend.repository.TaskRepository;
import com.example.backend.service.TaskService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    private final EntityManager entityManager;

    public TaskServiceImpl(TaskRepository taskRepository, EntityManager entityManager) {
        this.taskRepository = taskRepository;
        this.entityManager = entityManager;
    }

    @Override
    public void deleteTaskByProjectId(Long id) {
        taskRepository.deleteByProjectId(id);
    }

    @Override
    public void deleteTaskByStatusNameAndProject(Long projectId, String statusName) {
        taskRepository.deleteByProjectIdAndStatusName(projectId, statusName);
    }

    @Override
    public void setStatusNameByProjectAndStatusName(Long projectId, String oldStatusName, String newStatusName) {
        taskRepository.setStatusForTask(projectId, oldStatusName, newStatusName);
    }

    @Override
    public void setStatusNameByTaskId(Long taskId, String newStatusName) {
        taskRepository.setStatusByTaskId(taskId, newStatusName);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public List<Task> findTasksByProjectAndStatus(Long projectId, String statusName) {
        return taskRepository.findByProjectIdAndStatusName(projectId, statusName);
    }

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }
}
