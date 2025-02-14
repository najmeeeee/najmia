package com.marian.project.service;

import com.marian.project.model.Notification;
import com.marian.project.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // Fetch all notifications
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    // Fetch notification by notid
    public Optional<Notification> getNotificationByNotid(Long notid) {
        return notificationRepository.findById(notid);
    }

    // Create a new notification
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    // Update an existing notification
    public Notification updateNotification(Long notid, Notification notificationDetails) {
        Notification notification = notificationRepository.findById(notid)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setType(notificationDetails.getType());
        notification.setTitle(notificationDetails.getTitle());
        notification.setMessage(notificationDetails.getMessage());
        notification.setIcon(notificationDetails.getIcon());

        return notificationRepository.save(notification);
    }

    // Delete notification by notid
    public void deleteNotification(Long notid) {
        notificationRepository.deleteById(notid);
    }
}
