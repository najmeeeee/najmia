package com.marian.project.repository;

import com.marian.project.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // JpaRepository provides all CRUD operations (save, delete, findById, etc.)
}
