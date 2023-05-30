package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.model.User;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface ProjectService {

    Project saveProject(Project project);

    List<Project> findProjectsOfUser(Long userId);

    List<Project> findProjectsByUser(Long userId);

    Optional<Project> findProjectById(Long id);

    @Transactional
    void deleteProject(Long projectId);
}
