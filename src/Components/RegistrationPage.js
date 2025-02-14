import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';
import logo from '../images/logo.jpeg';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); // This will hold the filtered events
  const [title, setTitle] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [participantType, setParticipantType] = useState('individual');
  const [participants, setParticipants] = useState(['']);
  const [eventDate, setEventDate] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [collegeNameError, setCollegeNameError] = useState('');
  const [participantNameError, setParticipantNameError] = useState('');
  const userId = sessionStorage.getItem("userId");

  // Fetch events from the Spring Boot API
  useEffect(() => {
    // Fetch events based on participantType (individual/group)
    fetch(`http://localhost:8080/api/admin/events?type=${participantType}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, [participantType]); // Re-fetch events when participantType changes

  const handleParticipantChange = (index, event) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = event.target.value;
    setParticipants(updatedParticipants);
  };

  const addParticipant = () => {
    if (participants.length < 5) {
      setParticipants([...participants, '']);
    }
  };

  const validateCollegeName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!name.match(regex)) {
      setCollegeNameError('College name must contain only alphabets and spaces.');
    } else {
      setCollegeNameError('');
    }
  };

  const validateParticipantName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!name.match(regex)) {
      setParticipantNameError('Participant name must contain only alphabets and spaces.');
    } else {
      setParticipantNameError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setIsLoading(true);

    // Validation
    if (!title || !collegeName || !eventDate) {
      setFormError('All fields are required.');
      setIsLoading(false);
      return;
    }

    if (participantType === 'group' && participants.length === 1) {
      setFormError('Please add at least one participant.');
      setIsLoading(false);
      return;
    }

    // Map participants to individual fields if the type is group
    const registrationData = {
      eventName: title,
      collegeName,
      participantType,
      eventDate,
      userId: userId,
      participant1: participants[0] || '',
      participant2: participants[1] || '',
      participant3: participants[2] || '',
      participant4: participants[3] || '',
      participant5: participants[4] || ''
    };

    // Submit form data to the backend
    fetch('http://localhost:8080/api/event-registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject('Failed to submit registration');
        }
        return response.text();
      })
      .then((text) => {
        if (text === 'Registration Successful') {
          alert('Registration Successful!');
          navigate('/booking-history');
        } else {
          throw new Error('Error: ' + text);
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        setFormError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id="registration-wrapper">

      <div className="registration-page">
        <header id="header">
          <div id="logo">
            <a href="/dashboard">
              <img src={logo} alt="Sahya College Logo" id="logo-img" />
            </a>
          </div>
          <div id="tt"> Sahya College Fest Event Registration</div>
        </header>
        <h2 className="section-title">Event Registration</h2>
       
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="participant-type">Participant Type:</label>
            <select
              id="participant-type"
              value={participantType}
              onChange={(e) => setParticipantType(e.target.value)}
            >
              <option value="individual">Individual</option>
              <option value="group">Group</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="event-title">Event Title:</label>
            <select
              id="event-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            >
              <option value="">Select an event</option>
              {events.map((event) => (
                <option key={event.id} value={event.title}>
                  {event.title} (Seats left: {event.seats})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="college-name">College Name:</label>
            <input
              type="text"
              id="college-name"
              value={collegeName}
              onChange={(e) => {
                setCollegeName(e.target.value);
                validateCollegeName(e.target.value);
              }}
              required
            />
            {collegeNameError && <p className="error-message">{collegeNameError}</p>}
          </div>

          {/* Participant Name Field for "individual" */}
          {participantType === 'individual' && (
            <div className="form-group">
              <label htmlFor="participant-name">Participant Name:</label>
              <input
                type="text"
                id="participant-name"
                placeholder="Enter participant name"
                value={participants[0]}
                onChange={(e) => {
                  handleParticipantChange(0, e);
                  validateParticipantName(e.target.value);
                }}
                required
              />
              {participantNameError && <p className="error-message">{participantNameError}</p>}
            </div>
          )}

          {/* Show multiple participant inputs for "group" */}
          {participantType === 'group' && (
            <div className="form-group">
              <label>Participants:</label>
              {participants.map((participant, index) => (
                <div key={index} className="participant">
                  <input
                    type="text"
                    placeholder={`Participant ${index + 1}`}
                    value={participant}
                    onChange={(e) => handleParticipantChange(index, e)}
                    required
                  />
                </div>
              ))}
              {participants.length < 5 && (
                <button
                  type="button"
                  className="add-participant"
                  onClick={addParticipant}
                >
                  Add Participant
                </button>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="event-date">Event Date:</label>
            <input
              type="date"
              id="event-date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>

          {formError && <p className="error-message">{formError}</p>}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
      <footer id="foot">
                <p  style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
            </footer>
       
    </div>
  );
};

export default RegistrationPage;
