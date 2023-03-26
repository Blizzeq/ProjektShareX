package com.example.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "groups")
public class Group {

    @Id
    private String id;

    private String name;
    private LocalDateTime createdAt;
    @DBRef
    private AvatarFile avatarFile;
    @DBRef
    private List<User> usersList;

    public Group(String name, LocalDateTime createdAt, AvatarFile avatarFile, List<User> usersList) {
        this.name = name;
        this.createdAt = createdAt;
        this.avatarFile = avatarFile;
        this.usersList = usersList;
    }
}
