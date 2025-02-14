package com.marian.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.marian.project.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

	Event findByTitle(String eventTitle);


	
}
