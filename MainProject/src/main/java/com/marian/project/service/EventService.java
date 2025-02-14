package com.marian.project.service;

import com.marian.project.model.Event;
import com.marian.project.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Optional<Event> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            updatedEvent.setId(id);
            return eventRepository.save(updatedEvent);
        }
        throw new RuntimeException("Event not found");
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
    // New method to get the total count of events
    public long getTotalEventsCount() {
        return eventRepository.count();
}
}