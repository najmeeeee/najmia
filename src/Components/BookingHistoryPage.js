import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingHistory.css';
import logo from '../images/logo.jpeg';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      // Redirect if no user is logged in
      navigate('/login');
      return;
    }
  
    // Fetch specific booking details
    fetch(`http://localhost:8080/api/event-registrations/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching bookings');
        }
  
        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          // If the response is not JSON, return an empty array
          return [];
        }
  
        // Parse the response as JSON
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          // No bookings found
          setBookings([]);
          setSuccessMessage('');
        } else {
          // Only select necessary fields for the frontend
          const filteredBookings = data.map((booking) => ({
            registerId: booking.registerId,
            eventName: booking.eventName,
            collegeName: booking.collegeName,
            participants: [
              booking.participant1 || '',
              booking.participant2 || '',
              booking.participant3 || '',
              booking.participant4 || '',
              booking.participant5 || '',
            ],
            status: booking.status || 'Pending',
            message: booking.message || '',
          }));
          setBookings(filteredBookings);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [userId, navigate]);

  const handleCancelBooking = (registerId) => {
    if (!registerId) {
      console.error('Invalid registerId');
      return;
    }

    const token = sessionStorage.getItem('authToken'); // Assuming token is stored in sessionStorage

    fetch(`http://localhost:8080/api/event-registrations/cancel/${registerId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error canceling booking');
        }
        return response.text(); // Get the response text (message)
      })
      .then((message) => {
        alert(message); // Display an alert with the success message
        // Remove the canceled booking from the state
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.registerId !== registerId)
        );
      })
      .catch((error) => {
        setError('Error canceling booking'); // Show error if cancellation fails
        console.error(error.message);
      });
  };

  return (
    <div id="booking-history-page-wrapper">
      <header id="header">
        <div id="logo">
          <a href="/dashboard">
            <img src={logo} alt="Sahya College Logo" id="logo-img" />
          </a>
        </div>
        <div id="tt">Welcome to Sahya College Fest</div>
      </header>
      <div className="booking-history-page">
        <p>Here you can view and manage your event bookings.</p>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="booking-card" style={{ color: 'black' }}>
              <div className="card-header">{booking.eventName}</div>
              <div className="card-body">
                <div className="card-detail">
                  <strong>College Name:</strong> {booking.collegeName}
                </div>
                <div className="card-detail">
                  <strong>Participants:</strong>{' '}
                  {booking.participants.filter((p) => p).join(', ')}
                </div>
                <div className="card-detail">
                  <strong>Status:</strong> {booking.status} {/* Display status */}
                </div>
                <div className="card-detail">
                  <strong>Message:</strong> {booking.message} {/* Display message */}
                </div>
              </div>

              <div className="button-container">
                <button
                  onClick={() => handleCancelBooking(booking.registerId)} // Corrected key usage
                  className="cancel-button"
                  style={{ color: 'black', fontSize: '18px' }}
                >
                  X Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>{successMessage || 'No bookings found.'}</p>
        )}

        {/* Display success message if set */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <footer id="foot">
          <p style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default BookingHistoryPage;