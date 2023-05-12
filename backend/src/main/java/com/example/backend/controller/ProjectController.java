package com.example.backend.controller;

import com.example.backend.model.Project;
import com.example.backend.security.UserPrinciple;
import com.example.backend.service.ProjectService;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/project")
public class ProjectController {

    private final ProjectService projectService;

    private final TaskService taskService;

    @Autowired
    public ProjectController(ProjectService projectService, TaskService taskService) {
        this.projectService = projectService;
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProjectsOfUser(@AuthenticationPrincipal UserPrinciple userPrinciple) {
        return ResponseEntity.ok(projectService.findProjectsOfUser(userPrinciple.getId()));
    }

    @PostMapping("create")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        return new ResponseEntity<>(projectService.saveProject(project), HttpStatus.CREATED);
    }

    @DeleteMapping("{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable Long projectId) {
        taskService.deleteTaskByProjectId(projectId);

        projectService.deleteProjectById(projectId);

        return ResponseEntity.ok().build();
    }

}
