import React, { useState, useEffect } from 'react';
import './EventsPage.css';
import evevi from "../videos/evevi.mp4"; // Import the video
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpeg';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle button click and redirect to event registration page
  const handleRegisterClick = () => {
    navigate('/evereg'); // Redirect to the event registration page
  };

  useEffect(() => {
    // Fetch events from the backend
    fetch('http://localhost:8080/api/admin/events')
      .then((response) => response.json())
      .then((data) => {
        // Sort events by date and time in ascending order
        const sortedEvents = data.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA - dateB; // Ascending order
        });
        setEvents(sortedEvents);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="eve-page">
      {/* Background video */}
      <header id="custom-header">
        <div id="logo">
          <a href="/dashboard">
            <img src={logo} alt="Sahya College Logo" id="logo-img" />
          </a>
        </div>
        <div>
          <h2 style={{ color: 'white' }}>Upcoming Events of Marian College</h2>
        </div>
      </header>

      <video autoPlay loop muted className="background-video">
        <source src={evevi} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Scrolling Register Button with Pause on Hover */}
      <div className="scrolling-register-btn-container">
        <marquee
          direction="left"
          scrollamount="10"
          onMouseEnter={(e) => e.target.stop()}
          onMouseLeave={(e) => e.target.start()}
        >
          <button className="register-button" onClick={handleRegisterClick}>
            Register for an Event
          </button>
        </marquee>
      </div>

      {/* Events Listing */}
      <div className="eve-container">
        {events.map((event, index) => (
          <div key={event.id || index} className="eve-card">
            <div className="eve-images">
              {/* Render first image */}
              <img
                src={
                  event.image1
                    ? event.image1.startsWith('data:image')
                      ? event.image1
                      : `data:image/jpeg;base64,${event.image1}`
                    : "https://via.placeholder.com/150?text=Event+Image"
                }
                alt={event.title || 'Event Image'}
                className="eve-image top-left"
              />

              {/* Render second image */}
              {event.image2 && (
                <img
                  src={
                    event.image2.startsWith('data:image')
                      ? event.image2
                      : `data:image/jpeg;base64,${event.image2}`
                  }
                  alt={event.title || 'Event Image'}
                  className="eve-image top-right"
                />
              )}

              {/* Render third image */}
              {event.image3 && (
                <img
                  src={
                    event.image3.startsWith('data:image')
                      ? event.image3
                      : `data:image/jpeg;base64,${event.image3}`
                  }
                  alt={event.title || 'Event Image'}
                  className="eve-image bottom-left"
                />
              )}

              {/* Render fourth image */}
              {event.image4 && (
                <img
                  src={
                    event.image4.startsWith('data:image')
                      ? event.image4
                      : `data:image/jpeg;base64,${event.image4}`
                  }
                  alt={event.title || 'Event Image'}
                  className="eve-image bottom-right"
                />
              )}
            </div>

            <div className="eve-info">
              <h3>{event.title || 'Event Title'}</h3>
              <p className="event-meta">
                <strong>Description:</strong> {event.fullDescription || 'No description provided.'} <br />
                {event.guidelines && (
                  <>
                    <strong>Guidelines:</strong>
                    <ul>
                      {event.guidelines.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </>
                )}
                <strong>Date:</strong> {event.date || 'TBD'} <br />
                <strong>Time:</strong> {event.time || 'TBD'} <br />
                <strong>Location:</strong> {event.location || 'Online/Offline'} <br />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
