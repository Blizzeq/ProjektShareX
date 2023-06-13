package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(name = "is_read", nullable = false)
    private boolean isRead;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "create_time", nullable = false)
    private LocalDateTime createdTime;

}
