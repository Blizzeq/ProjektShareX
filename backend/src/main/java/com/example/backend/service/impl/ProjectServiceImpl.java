package com.example.backend.service.impl;

import com.example.backend.model.Project;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.service.ProjectService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project saveProject(Project project) {
        project.setCreatedTime(LocalDateTime.now());

        return projectRepository.save(project);
    }

    @Override
    public List<Project> findProjectsOfUser(Long id) {
        return projectRepository.findByCreatedById(id);
    }
}
