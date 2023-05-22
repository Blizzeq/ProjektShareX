package com.example.backend.controller;

import com.example.backend.model.Project;
import com.example.backend.model.User;
import com.example.backend.service.ProjectService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/usersList")
public class UserController {

    private final UserService userService;

    private final ProjectService projectService;

    public UserController(UserService userService, ProjectService projectService) {
        this.userService = userService;
        this.projectService = projectService;
    }

    @GetMapping("{userId}")
    public ResponseEntity<?> getUserList(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.usernameList(userId));
    }

    @GetMapping("{projectId}/unassigned-users")
    public ResponseEntity<List<User>> getUnassignedUsers(@PathVariable Long projectId) {
        List<User> unassignedUsers = userService.findUnassignedUsers(projectId);

        return ResponseEntity.ok(unassignedUsers);
    }

    @PostMapping("add/{projectId}/{userId}")
    public ResponseEntity<String> addUserToProject(@PathVariable Long userId, @PathVariable Long projectId) {
        User user = userService.findById(userId);
        Optional<Project> projectOptional = projectService.findProjectById(projectId);

        if (projectOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Project project = projectOptional.get();

        user.getProjects().add(project);
        project.getUsers().add(user);

        userService.saveUser(user);
        projectService.saveProject(project);

        return ResponseEntity.ok("User added to project successfully.");
    }
}
