package com.example.backend.service.impl;

import com.example.backend.model.Notification;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.service.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Notification saveNotification(Notification notification) {
        notification.setCreatedTime(LocalDateTime.now());
        notification.setRead(false);

        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> findNotificationByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public long countNotReadNotification(Long userId) {
        return notificationRepository.countNotReadNotificationByUser(userId);
    }

    @Override
    public void changeIsRead(Long userId) {
        notificationRepository.setIsRead(userId);
    }

}
