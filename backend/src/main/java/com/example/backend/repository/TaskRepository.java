package com.example.backend.repository;

import com.example.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Transactional
    void deleteByProjectId(Long projectId);

    @Transactional
    void deleteByProjectIdAndStatusName(Long projectId, String statusName);

    List<Task> findByProjectIdAndStatusName(Long projectId, String statusName);

    @Query("SELECT DISTINCT t.statusName FROM Task t WHERE t.project.id = :projectId")
    List<String> findUniqueStatusesByProjectId(@Param("projectId") Long projectId);

}
