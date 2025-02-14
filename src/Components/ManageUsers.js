import React, { useState, useEffect } from 'react';
import './ManageUsers.css';
import logo from '../images/logo.jpeg'; 

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all user data from the API
    fetch('http://localhost:8080/api/users/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching users');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div id="manage-users">
         <header id="headadmin">
         <div id="logo" style={{ marginLeft: '-350px' }}>
            <a href="/admin">
                <img src={logo} alt="Sahya College Logo" id="logo-img" />
            </a> 
        </div>
                <div id="tt">Welcome to Sahya College Fest</div>
            </header>
      <h2 id="manage-users-heading">Manage Users</h2>
      
      {isLoading ? (
        <p id="loading-message">Loading...</p>
      ) : error ? (
        <p id="error-message">{error}</p>
      ) : users.length > 0 ? (
        <table id="users-table" className="users-table">
          <thead>
            <tr>
              <th id="user-id-header">User ID</th>
              <th id="name-header">Name</th>
              <th id="email-header">Email</th>
              <th id="student-id-header">Student ID</th>
              <th id="department-header">Department</th>
              <th id="year-of-study-header">Year of Study</th>
              <th id="phone-number-header">Phone Number</th>
              <th id="role-header">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} id={`user-row-${user.id}`}>
                <td id={`user-id-${user.id}`}>{user.id}</td>
                <td id={`name-${user.id}`}>{user.name}</td>
                <td id={`email-${user.id}`}>{user.email}</td>
                <td id={`student-id-${user.id}`}>{user.studentId}</td>
                <td id={`department-${user.id}`}>{user.department}</td>
                <td id={`year-of-study-${user.id}`}>{user.yearOfStudy}</td>
                <td id={`phone-number-${user.id}`}>{user.phoneNumber}</td>
                <td id={`role-${user.id}`}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p id="no-users-message">No users found.</p>
        
      )}
        <footer id="foot">
                <p  style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
            </footer>
    </div>
  );
};

export default ManageUsers;
