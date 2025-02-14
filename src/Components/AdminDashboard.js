import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AdminDashboard.css'; // Ensure you have the correct CSS
import logo from '../images/logo.jpeg'; 

const AdminDashboard = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  // State hooks to store data for total events, users, sponsors, and registrations
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);

  const [totalRegistrations, setTotalRegistrations] = useState(0); // New state for registrations count

  useEffect(() => {
    // Fetch total events count
    fetch('http://localhost:8080/api/admin/events/count')
      .then(response => response.json())
      .then(data => setTotalEvents(data))
      .catch(error => console.error('Error fetching event count:', error));

    // Fetch total participants count (users count)
    fetch('http://localhost:8080/api/users/count')  // Correct endpoint for user count
      .then(response => response.json())
      .then(data => setTotalParticipants(data)) // Set the total user count
      .catch(error => console.error('Error fetching user count:', error));



    // Fetch total registrations count (event registrations count)
    fetch('http://localhost:8080/api/event-registrations/count') // New endpoint for registration count
      .then(response => response.json())
      .then(data => setTotalRegistrations(data))
      .catch(error => console.error('Error fetching registrations count:', error));
  }, []);  // Empty array ensures this runs only once on component mount

  return (
    <div id="admin-dashboard">
      {/* Dashboard Layout */}
      <header id="headadmin">
            <div id="logo">
            <a href="/dash">
                <img src={logo} alt="Sahya College Logo" id="logo-img" />
            </a> 
        </div>
                <div id="tt">Welcome to Sahya College Fest</div>
            </header>
      <div id="dashboard-layout" className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li><Link to="/manage-events">Manage Events</Link></li>
            <li><Link to="/manage-registrations">Manage Registrations</Link></li>
            <li><Link to="/manage-users">Manage Users</Link></li>
            <li><Link to="/notification">Manage Notification</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <div id="dashboard-content" className="dashboard-content">
          {/* Summary Tiles */}
          <div id="summary-tiles" className="summary-tiles">
            <div className="tile new-events">
              <h2>{totalEvents}</h2>
              <p>New Events</p>
            </div>
            <div className="tile participants">
              <h2>{totalParticipants}</h2>
              <p>Users</p>
            </div>
            <div className="tile registrations">
              <h2>{totalRegistrations}</h2> {/* Display total registrations */}
              <p>Registrations</p>  {/* Label for registrations */}
            </div>
          </div>

          {/* Report Section */}
          <div className="widget">
            <h3>Latest Report</h3>
            <p>Total Events: {totalEvents}</p>
            <p>Total Participants: {totalParticipants}</p>
          
            <p>Total Registrations: {totalRegistrations}</p> {/* Display total registrations in report */}
            <button onClick={() => navigate('/logout')}>Logout</button>
          </div>
        </div>
        <footer id="foot">
                <p  style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
            </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
