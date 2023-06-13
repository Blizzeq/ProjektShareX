package com.example.backend.repository;

import com.example.backend.model.FileData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<FileData, Long> {

    Optional<FileData> findByName(String fileName);

    Optional<FileData> findById(Long fileId);

}
