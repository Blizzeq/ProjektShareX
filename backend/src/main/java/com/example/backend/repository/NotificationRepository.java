package com.example.backend.repository;

import com.example.backend.model.Notification;
import com.example.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserId(Long userId);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.isRead = false AND n.userId = :userId")
    long countNotReadNotificationByUser(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query("UPDATE Notification SET isRead = true WHERE id = :notificationId")
    void setIsRead(Long notificationId);

}
