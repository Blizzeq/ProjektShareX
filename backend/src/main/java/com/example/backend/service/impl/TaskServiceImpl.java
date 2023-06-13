package com.example.backend.service.impl;

import com.example.backend.model.Task;
import com.example.backend.model.User;
import com.example.backend.repository.TaskRepository;
import com.example.backend.service.TaskService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    private final EntityManager entityManager;

    public TaskServiceImpl(TaskRepository taskRepository, EntityManager entityManager) {
        this.taskRepository = taskRepository;
        this.entityManager = entityManager;
    }

    @Override
    public void deleteTaskByProjectId(Long id) {
        taskRepository.deleteByProjectId(id);
    }

    @Override
    public void deleteTaskByStatusNameAndProject(Long projectId, String statusName) {
        taskRepository.deleteByProjectIdAndStatusName(projectId, statusName);
    }

    @Override
    public void setStatusNameByProjectAndStatusName(Long projectId, String oldStatusName, String newStatusName) {
        taskRepository.setStatusForTask(projectId, oldStatusName, newStatusName);
    }

    @Override
    public void setStatusNameByTaskId(Long taskId, String newStatusName) {
        taskRepository.setStatusByTaskId(taskId, newStatusName);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public List<Task> findTasksByProjectAndStatus(Long projectId, String statusName) {
        return taskRepository.findByProjectIdAndStatusName(projectId, statusName);
    }

    @Override
    public List<Task> findTasks(Long projectId) {
        return taskRepository.findByProjectIdAndNameIsNotNull(projectId);
    }

    @Override
    public List<User> findTasksByProject(Long taskId) {
        String query = "SELECT * FROM users WHERE id IN " + "(SELECT user_id FROM users_assign_tasks WHERE task_id = :taskId)";

        Query nativeQuery = entityManager.createNativeQuery(query, User.class);
        nativeQuery.setParameter("taskId", taskId);

        return nativeQuery.getResultList();
    }

    @Override
    @Transactional
    public void deleteAssignedTasks(Long projectId, String statusName) {
        Query query = entityManager.createNativeQuery("DELETE FROM users_assign_tasks WHERE task_id IN (SELECT id FROM tasks WHERE project_id = :projectId AND status_name = :statusName)");
        query.setParameter("projectId", projectId);
        query.setParameter("statusName", statusName);
        query.executeUpdate();

        Query query2 = entityManager.createNativeQuery("DELETE FROM files_assign_task WHERE task_id IN (SELECT id FROM tasks WHERE project_id = :projectId AND status_name = :statusName)");
        query2.setParameter("projectId", projectId);
        query2.setParameter("statusName", statusName);
        query2.executeUpdate();
    }

    @Override
    @Transactional
    public void deleteAssignedUserToTask(String username, Long taskId) {
        Query query = entityManager.createNativeQuery("DELETE FROM users_assign_tasks WHERE user_id IN (SELECT id FROM users WHERE username = :username) AND task_id = :taskId");
        query.setParameter("taskId", taskId);
        query.setParameter("username", username);
        query.executeUpdate();
    }

    @Override
    @Transactional
    public void deleteAssignedUsersToTasks(Long taskId) {
        Query query = entityManager.createNativeQuery("DELETE FROM users_assign_tasks WHERE task_id = :taskId");
        query.setParameter("taskId", taskId);
        query.executeUpdate();
    }

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }
}
