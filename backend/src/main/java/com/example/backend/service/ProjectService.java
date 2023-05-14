package com.example.backend.service;

import com.example.backend.model.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectService {

    Project saveProject(Project project);

    List<Project> findProjectsOfUser(Long userId);

    Optional<Project> findProjectById(Long id);

    void deleteProjectById(Long id);

}
