package com.marian.project.controller;

import com.marian.project.model.Event;
import com.marian.project.model.EventRegistration;
import com.marian.project.repository.EventRegistrationRepository;
import com.marian.project.repository.EventRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/event-registrations")
public class EventRegistrationController {

    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    @Autowired
    private EventRepository eventRepository;

    // Event registration method
    @PostMapping
    public ResponseEntity<String> registerForEvent(@RequestBody EventRegistration registrationData) {
        String eventTitle = registrationData.getEventName();
        String collegeName = registrationData.getCollegeName();
        String participantType = registrationData.getParticipantType();
        String userId = registrationData.getUserId();
        LocalDate eventDate = registrationData.getEventDate();

        // Fetch the event by its title
        Event event = eventRepository.findByTitle(eventTitle);
        if (event == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
        }

        // Ensure there are available seats before registering
        if (event.getSeats() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No seats available for this event");
        }

        // Create the EventRegistration object and populate it with participant details
        EventRegistration registration = new EventRegistration();
        registration.setEventName(eventTitle);
        registration.setCollegeName(collegeName);
        registration.setParticipantType(participantType);
        registration.setUserId(userId);
        registration.setEventDate(eventDate);
        registration.setParticipant1(registrationData.getParticipant1());
        registration.setParticipant2(registrationData.getParticipant2());
        registration.setParticipant3(registrationData.getParticipant3());
        registration.setParticipant4(registrationData.getParticipant4());
        registration.setParticipant5(registrationData.getParticipant5());

        // Save the registration object to the database
        eventRegistrationRepository.save(registration);

        // Decrease the seat count for the event and update the event
        event.setSeats(event.getSeats() - 1);
        eventRepository.save(event);

        return ResponseEntity.status(HttpStatus.CREATED).body("Registration Successful");
    }

    // Fetch all bookings by userId, including registerId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventRegistration>> getBookingsByUserId(@PathVariable String userId) {
        List<EventRegistration> bookings = eventRegistrationRepository.findByUserId(userId);

        if (bookings == null || bookings.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no bookings found
        }

        return ResponseEntity.ok(bookings); // Return the list of bookings
    }

    // Cancel event using registerId
    @DeleteMapping("/cancel/{registerId}")
    public ResponseEntity<String> cancelEvent(@PathVariable Long registerId) {
        Optional<EventRegistration> optionalRegistration = eventRegistrationRepository.findById(registerId);

        if (optionalRegistration.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registration not found");
        }

        EventRegistration registration = optionalRegistration.get();

        // Restore the seat count for the associated event
        Event event = eventRepository.findByTitle(registration.getEventName());
        if (event != null) {
            event.setSeats(event.getSeats() + 1);
            eventRepository.save(event);
        }

        // Delete the registration
        eventRegistrationRepository.deleteById(registerId);

        return ResponseEntity.ok("Event canceled successfully");
    }

    // Fetch all event registrations
    @GetMapping
    public ResponseEntity<List<EventRegistration>> getAllEventRegistrations() {
        List<EventRegistration> registrations = eventRegistrationRepository.findAll();
        return registrations.isEmpty() ? 
            ResponseEntity.noContent().build() : ResponseEntity.ok(registrations);
    }

    @PutMapping("/{registerId}")
    public ResponseEntity<String> updateRegistrationStatus(
            @PathVariable Long registerId, 
            @RequestBody EventRegistration updatedRegistrationData) {

        Optional<EventRegistration> optionalRegistration = eventRegistrationRepository.findById(registerId);

        if (optionalRegistration.isEmpty()) {
            // Return plain text response if registration is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Registration not found");
        }

        EventRegistration registration = optionalRegistration.get();

        // Ensure that only the status and message fields are being updated
        registration.setStatus(updatedRegistrationData.getStatus());
        registration.setMessage(updatedRegistrationData.getMessage());

        // Save the updated registration
        eventRegistrationRepository.save(registration);

        // Return plain text response for successful update
        return ResponseEntity.status(HttpStatus.OK)
            .body("Event updated successfully");
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getTotalRegistrationsCount() {
        try {
            long totalRegistrations = eventRegistrationRepository.count(); // Get the count from the repository
            return ResponseEntity.ok(totalRegistrations);  // Return the count
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return error if something goes wrong
        }
    }
}
