package com.example.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "files")
public class FileInfo {

    @Id
    private String id;

    private String fileName;
    private String contentType;
    private double size;
    private LocalDateTime createdAt;
    @DBRef
    private User owner;
    @DBRef
    private Group group;
    @DBRef
    private UploadFile uploadFile;

    public FileInfo(String fileName, String contentType, double size, LocalDateTime createdAt, User owner, Group group, UploadFile uploadFile) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.size = size;
        this.createdAt = createdAt;
        this.owner = owner;
        this.group = group;
        this.uploadFile = uploadFile;
    }
}
