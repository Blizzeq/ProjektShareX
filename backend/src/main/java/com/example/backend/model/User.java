package com.example.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private LocalDateTime createdAt;
    private boolean isActive;
    @DBRef
    private AvatarFile avatar;
    @DBRef
    private Map<Group, Role> groups;

    public User(String username, String password, String email, String phoneNumber, LocalDateTime createdAt, boolean isActive, AvatarFile avatar, Map<Group, Role> groups) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.createdAt = createdAt;
        this.isActive = isActive;
        this.avatar = avatar;
        this.groups = groups;
    }
}
