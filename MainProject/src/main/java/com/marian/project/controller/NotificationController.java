package com.marian.project.controller;

import com.marian.project.model.Notification;
import com.marian.project.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Endpoint to get all notifications
    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    // Endpoint to get a notification by notid
    @GetMapping("/{notid}")
    public ResponseEntity<Notification> getNotificationByNotid(@PathVariable Long notid) {
        Optional<Notification> notification = notificationService.getNotificationByNotid(notid);
        return notification.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to create a new notification
    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    // Endpoint to update an existing notification
    @PutMapping("/{notid}")
    public ResponseEntity<Notification> updateNotification(@PathVariable Long notid, @RequestBody Notification notification) {
        Notification updatedNotification = notificationService.updateNotification(notid, notification);
        return ResponseEntity.ok(updatedNotification);
    }

    // Endpoint to delete a notification
    @DeleteMapping("/{notid}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notid) {
        notificationService.deleteNotification(notid);
        return ResponseEntity.noContent().build();
    }
}
