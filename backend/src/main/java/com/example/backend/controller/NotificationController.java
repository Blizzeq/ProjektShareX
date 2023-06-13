package com.example.backend.controller;

import com.example.backend.model.Notification;
import com.example.backend.model.Task;
import com.example.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("all/{userId}")
    public ResponseEntity<?> getAllNotificationsOfUser(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.findNotificationByUserId(userId));
    }

    @PostMapping("create")
    public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
        Notification savedNotification = notificationService.saveNotification(notification);

        return ResponseEntity.ok(savedNotification);
    }

    @GetMapping("count/{userId}")
    public ResponseEntity<?> findNumberNotReadNotification(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.countNotReadNotification(userId));
    }

    @PutMapping("changeIsRead/{notificationId}")
    public ResponseEntity<?> changeIsReadToTrue(@PathVariable Long notificationId) {
        notificationService.changeIsRead(notificationId);

        return ResponseEntity.ok().build();
    }
}
