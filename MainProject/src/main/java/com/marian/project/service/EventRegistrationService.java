package com.marian.project.service;

import com.marian.project.model.EventRegistration;
import com.marian.project.repository.EventRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventRegistrationService {

    @Autowired
    private EventRegistrationRepository eventRegistrationRepository; // Use this instance to save or fetch data

    // Save or Update Event Registration
    public EventRegistration saveEventRegistration(EventRegistration eventRegistration) {
        return eventRegistrationRepository.save(eventRegistration); // JPA will automatically handle the foreign key
    }

    // Get All Event Registrations
    public List<EventRegistration> getAllEventRegistrations() {
        return eventRegistrationRepository.findAll();
    }

    // Get Event Registration by Register ID
    public Optional<EventRegistration> getEventRegistrationById(Long registerId) {
        return eventRegistrationRepository.findById(registerId);
    }

    // Delete Event Registration by Register ID
    public void deleteEventRegistration(Long registerId) {
        eventRegistrationRepository.deleteById(registerId);
    }
}
