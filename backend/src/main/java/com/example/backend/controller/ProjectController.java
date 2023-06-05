package com.example.backend.controller;

import com.example.backend.model.Project;
import com.example.backend.model.User;
import com.example.backend.security.UserPrinciple;
import com.example.backend.service.ProjectService;
import com.example.backend.service.TaskService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("api/project")
public class ProjectController {

    private final ProjectService projectService;

    private final TaskService taskService;

    private final UserService userService;

    @Autowired
    public ProjectController(ProjectService projectService, TaskService taskService, UserService userService) {
        this.projectService = projectService;
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping("all/{userId}")
    public ResponseEntity<?> getAllProjectsOfUser(@PathVariable Long userId) {
        return ResponseEntity.ok(projectService.findProjectsByUser(userId));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.findProjectById(id);
        if (project.isPresent()) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("create")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        User user = userService.findById(project.getCreatedById());

        project.getUsers().add(user);
        user.getProjects().add(project);

        Project savedProject = projectService.saveProject(project);

        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @DeleteMapping("{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable Long projectId) {
        projectService.deleteAssignedUsersToTasksInProject(projectId);
        taskService.deleteTaskByProjectId(projectId);

        projectService.deleteProject(projectId);

        return ResponseEntity.ok().build();
    }

}
