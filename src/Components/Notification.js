import React, { useState, useEffect } from 'react';
import './Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.jpeg'; 

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    icon: 'star',
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [messageWordCount, setMessageWordCount] = useState(0);
  const [errors, setErrors] = useState({
    title: '',
    message: '',
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Failed to fetch notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          return 'Title should only contain letters, numbers, and spaces.';
        }
        return '';
      case 'message':
        if (!/^[a-zA-Z0-9\s.,!?]+$/.test(value)) {
          return 'Message should only contain letters, numbers, spaces, and basic punctuation.';
        }
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the field and update errors
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    if (name === 'message') {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      setMessageWordCount(wordCount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const titleError = validateField('title', formData.title);
    const messageError = validateField('message', formData.message);
    if (titleError || messageError) {
      setErrors({
        title: titleError,
        message: messageError,
      });
      return;
    }

    if (editingId) {
      const response = await fetch(`http://localhost:8080/api/notifications/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedNotification = await response.json();
        setNotifications((prev) =>
          prev.map((notif) => (notif.notid === editingId ? updatedNotification : notif))
        );
        alert('Notification updated successfully!');
      }
      setEditingId(null);
    } else {
      const response = await fetch('http://localhost:8080/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newNotification = await response.json();
        setNotifications([...notifications, newNotification]);
        alert('Notification created successfully!');
      }
    }
    setShowForm(false);
    setFormData({ title: '', message: '', icon: 'star' });
    setMessageWordCount(0);
    setErrors({ title: '', message: '' });
  };

  const handleEdit = (notification) => {
    setEditingId(notification.notid);
    setFormData({
      title: notification.title,
      message: notification.message,
      icon: notification.icon,
    });
    setMessageWordCount(notification.message.trim().split(/\s+/).filter(Boolean).length);
    setShowForm(true);
  };

  const handleDelete = async (notid) => {
    const response = await fetch(`http://localhost:8080/api/notifications/${notid}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setNotifications(notifications.filter((notif) => notif.notid !== notid));
      alert('Notification deleted successfully!');
    } else {
      console.error('Failed to delete notification:', response.statusText);
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
    <div className="notification-container" id="notification-container">
         <header id="headadmin">
            <div id="logo">
            <a href="/admin">
                <img src={logo} alt="Sahya College Logo" id="logo-img" />
            </a> 
        </div>
                <div id="tt">Sahya College Fest</div>
            </header>
            <h2 id="notification-header" style={{ fontSize: "1.6rem", marginTop: "80px", textAlign: "center" }}>
  Sahya Fest Notifications
</h2>


      <button onClick={() => setShowForm(true)} id="create-notification-btn">Create New Notification</button>

      {showForm && (
        <form onSubmit={handleSubmit} id="notification-form">
          <h3 id="form-title">{editingId ? 'Edit Notification' : 'Add Notification'}</h3>

          <div className="form-group" id="title-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            {errors.title && <span className="error-message" id="title-error">{errors.title}</span>}
          </div>

          <div className="form-group" id="message-group">
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              maxLength={2000}
            />
            <div className="word-count" id="word-count">
              <small>{messageWordCount} / 200 words</small>
            </div>
            {errors.message && <span className="error-message" id="message-error">{errors.message}</span>}
          </div>

          <div className="form-group" id="icon-group">
            <label htmlFor="icon">Icon:</label>
            <select name="icon" id="icon" value={formData.icon} onChange={handleInputChange}>
              <option value="star">Star</option>
              <option value="bell">Bell</option>
              <option value="heart">Heart</option>
            </select>
          </div>

          <div id="form-buttons">
            <button type="submit" id="submit-button">
              {editingId ? 'Update Notification' : 'Create Notification'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} id="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="notifications-list" id="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.notid} className={`notification-item ${notification.type}`} id={`notification-item-${notification.notid}`}>
            <FontAwesomeIcon icon={getIcon(notification.icon)} className="icon" id={`icon-${notification.notid}`} />
            <h4 id={`title-${notification.notid}`}>{notification.title}</h4>
            <p id={`message-${notification.notid}`}>{notification.message}</p>

            <button onClick={() => handleEdit(notification)} className="action-btn" id={`edit-btn-${notification.notid}`}>
              Edit
            </button>

            <button onClick={() => handleDelete(notification.notid)} className="action-btn" id={`delete-btn-${notification.notid}`}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <footer id="foot">
                <p  style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
            </footer>
    </div>
  );
};

export default Notification;