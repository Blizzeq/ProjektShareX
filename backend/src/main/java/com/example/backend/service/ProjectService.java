package com.example.backend.service;

import com.example.backend.model.Project;

import java.util.List;

public interface ProjectService {

    Project saveProject(Project project);

    List<Project> findProjectsOfUser(Long userId);

    void deleteProjectById(Long id);

}
