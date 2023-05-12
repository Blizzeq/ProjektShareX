package com.example.backend.repository;

import com.example.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Transactional
    void deleteByProjectId(Long projectId);

}
