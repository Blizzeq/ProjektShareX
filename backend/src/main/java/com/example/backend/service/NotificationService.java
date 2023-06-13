package com.example.backend.service;

import com.example.backend.model.Notification;

import java.util.List;

public interface NotificationService {
    Notification saveNotification(Notification notification);

    List<Notification> findNotificationByUserId(Long userId);

    long countNotReadNotification(Long userId);

    void changeIsRead(Long userId);
}
