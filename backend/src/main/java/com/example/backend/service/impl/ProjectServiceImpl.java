package com.example.backend.service.impl;

import com.example.backend.model.Project;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.service.ProjectService;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    private final EntityManager entityManager;

    public ProjectServiceImpl(ProjectRepository projectRepository, EntityManager entityManager) {
        this.projectRepository = projectRepository;
        this.entityManager = entityManager;
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

    @Override
    public List<Project> findProjectsByUser(Long userId) {
        String query = "SELECT * FROM projects WHERE id IN " +
                "(SELECT project_id FROM users_projects WHERE user_id = :userId)";

        Query nativeQuery = entityManager.createNativeQuery(query, Project.class);
        nativeQuery.setParameter("userId", userId);

        return nativeQuery.getResultList();
    }

    @Override
    public Optional<Project> findProjectById(Long id) {
        return projectRepository.findById(id);
    }

    @Override
    @Transactional
    public void deleteProject(Long projectId) {
        Project project = entityManager.find(Project.class, projectId);

        Query query = entityManager.createNativeQuery("DELETE FROM users_projects WHERE project_id = :projectId");
        query.setParameter("projectId", projectId);
        query.executeUpdate();

        entityManager.remove(project);
    }

    @Override
    @Transactional
    public void deleteAssignedUsersToTasksInProject(Long projectId) {
        Query query = entityManager.createNativeQuery("DELETE FROM users_assign_tasks WHERE task_id IN (SELECT id from tasks WHERE project_id = :projectId)");
        query.setParameter("projectId", projectId);
        query.executeUpdate();

        Query query2 = entityManager.createNativeQuery("DELETE FROM files_assign_task WHERE task_id IN (SELECT id FROM tasks WHERE project_id = :projectId)");
        query2.setParameter("projectId", projectId);
        query2.executeUpdate();
    }
}
