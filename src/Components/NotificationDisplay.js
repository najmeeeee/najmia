import React, { useState, useEffect } from 'react';
import './NotificationDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.jpeg';

const NotificationDisplay = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        setIsLoading(false);
      } else {
        setError('Failed to fetch notifications');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Error fetching notifications: ' + error.message);
      setIsLoading(false);
    }
  };

  const getIcon = (icon) => {
    switch (icon) {
      case 'bell':
        return faBell;
      case 'heart':
        return faHeart;
      case 'star':
      default:
        return faStar;
    }
  };

  return (
    <div id="unique-container-id">
   <header id="header">
    <div id="logo" style={{ marginLeft: '-350px' }}>
        <a href="/dashboard">
            <img src={logo} alt="Sahya College Logo" id="logo-img" />
        </a> 
    </div>
    <div id="tt"> Sahya College Fest Alerts</div>
</header>




<h2 id="unique-heading-id" style={{ marginTop: '29px' }}>Latest Notifications</h2>


      {isLoading && <p id="unique-loading-id">Loading notifications...</p>}
      {error && <p id="unique-error-id">{error}</p>}

      <div id="unique-list-id">
        {notifications.length === 0 && !isLoading && !error ? (
          <p id="unique-no-notifications-id">No notifications available.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification.notid} id={`unique-notification-item-${notification.notid}`} className={`unique-notification-item ${notification.type}`}>
              <FontAwesomeIcon icon={getIcon(notification.icon)} id={`unique-icon-${notification.notid}`} className="unique-icon" />
              <h4 id={`unique-title-${notification.notid}`}>{notification.title}</h4>
              <p id={`unique-message-${notification.notid}`}>{notification.message}</p>
              
            </div>
          ))
        )}
      </div>

      <footer id="foot">
                <p  style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
            </footer>
    </div>
  );
};

export default NotificationDisplay;
