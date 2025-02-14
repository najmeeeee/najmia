package com.marian.project.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "event_registration")
public class EventRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registerId;  // Event registration ID
    
    private String eventName;
    private String collegeName;
    private String participantType;
    private String participant1;
    private String participant2;
    private String participant3;
    private String participant4;
    private String participant5;
    private LocalDate eventDate;

    @Column(name = "user_id")  // Explicitly specify the column name
    private String userId;

    @Column(name = "status", nullable = false)  // New Status column
    private String status = "Pending";  // Default value is "Pending"

    @Column(name = "message")  // New Message column
    private String message;

    public EventRegistration() {
        super();
    }

    public EventRegistration(Long registerId, String eventName, String collegeName, String participantType,
            String participant1, String participant2, String participant3, String participant4, String participant5,
            LocalDate eventDate, String userId, String status, String message) {
        super();
        this.registerId = registerId;
        this.eventName = eventName;
        this.collegeName = collegeName;
        this.participantType = participantType;
        this.participant1 = participant1;
        this.participant2 = participant2;
        this.participant3 = participant3;
        this.participant4 = participant4;
        this.participant5 = participant5;
        this.eventDate = eventDate;
        this.userId = userId;
        this.status = status;
        this.message = message;
    }

    // Getters and setters
    public Long getRegisterId() {
        return registerId;
    }

    public void setRegisterId(Long registerId) {
        this.registerId = registerId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getParticipantType() {
        return participantType;
    }

    public void setParticipantType(String participantType) {
        this.participantType = participantType;
    }

    public String getParticipant1() {
        return participant1;
    }

    public void setParticipant1(String participant1) {
        this.participant1 = participant1;
    }

    public String getParticipant2() {
        return participant2;
    }

    public void setParticipant2(String participant2) {
        this.participant2 = participant2;
    }

    public String getParticipant3() {
        return participant3;
    }

    public void setParticipant3(String participant3) {
        this.participant3 = participant3;
    }

    public String getParticipant4() {
        return participant4;
    }

    public void setParticipant4(String participant4) {
        this.participant4 = participant4;
    }

    public String getParticipant5() {
        return participant5;
    }

    public void setParticipant5(String participant5) {
        this.participant5 = participant5;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "EventRegistration [registerId=" + registerId + ", eventName=" + eventName + ", collegeName="
                + collegeName + ", participantType=" + participantType + ", participant1=" + participant1
                + ", participant2=" + participant2 + ", participant3=" + participant3 + ", participant4="
                + participant4 + ", participant5=" + participant5 + ", eventDate=" + eventDate + ", userId=" + userId
                + ", status=" + status + ", message=" + message + "]";
    }
}
