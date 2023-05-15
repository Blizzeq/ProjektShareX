package com.example.backend.controller;

import com.example.backend.exception.TaskNotFoundException;
import com.example.backend.model.Project;
import com.example.backend.model.Task;
import com.example.backend.repository.TaskRepository;
import com.example.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/task")
public class TaskController {

    private final TaskService taskService;

    private final UserService userService;

    private final ProjectService projectService;

    @Autowired
    private TaskRepository taskRepository;

    public TaskController(TaskService taskService, UserService userService, ProjectService projectService) {
        this.taskService = taskService;
        this.userService = userService;
        this.projectService = projectService;
    }

    @GetMapping("byProjectAndStatus/{projectId}/{statusName}")
    public ResponseEntity<?> getAllTasksByStatus(@PathVariable Long projectId, @PathVariable String statusName) {
        return ResponseEntity.ok(taskService.findTasksByProjectAndStatus(projectId, statusName));
    }

    @PostMapping("add/{projectId}")
    public ResponseEntity<?> addTaskToStatus(@RequestBody Task task, @PathVariable Long projectId) {
        task.setProjectId(projectId);

        Task savedTask = taskService.saveTask(task);

        return ResponseEntity.ok(savedTask);
    }

    @DeleteMapping("{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);

        return ResponseEntity.ok().build();
    }

    @PutMapping("update/{projectId}/{id}")
    public Task updateTask(@RequestBody Task newTask, @PathVariable Long projectId, @PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setName(newTask.getName());
                    task.setDescription(newTask.getDescription());
                    task.setAssignedUserId(newTask.getAssignedUserId());
                    task.setStatusName(newTask.getStatusName());
                    task.setProjectId(projectId);

                    return taskRepository.save(task);
                }).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @GetMapping("uniqueStatuses/{projectId}")
    public ResponseEntity<?> getUniqueTaskStatuses(@PathVariable Long projectId) {
        Optional<Project> project = projectService.findProjectById(projectId);
        if (project.isPresent()) {
            List<String> uniqueStatuses = taskRepository.findUniqueStatusesByProjectId(projectId);
            return ResponseEntity.ok(uniqueStatuses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("addStatus/{projectId}")
    public ResponseEntity<?> addStatus(@RequestBody Task task, @PathVariable Long projectId) {
        task.setStatusName(task.getStatusName());
        task.setProjectId(projectId);

        Task savedTask = taskService.saveTask(task);

        return ResponseEntity.ok(savedTask);
    }

    @DeleteMapping("deleteStatus/{projectId}/{statusName}")
    public ResponseEntity<?> deleteStatus(@PathVariable Long projectId, @PathVariable String statusName) {
        taskService.deleteTaskByStatusNameAndProject(projectId, statusName);

        return ResponseEntity.ok().build();
    }

}
