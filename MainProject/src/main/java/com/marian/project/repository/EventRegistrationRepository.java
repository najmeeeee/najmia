package com.marian.project.repository;

import com.marian.project.model.EventRegistration;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
	 List<EventRegistration> findByUserId(String userId);
	 Optional<EventRegistration> findByRegisterId(Long registerId);

}
