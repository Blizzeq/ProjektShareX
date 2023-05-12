package com.example.backend.service.impl;

import com.example.backend.repository.TaskRepository;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void deleteTaskByProjectId(Long id) {
        taskRepository.deleteByProjectId(id);
    }
}
