import React, { useState, useEffect } from "react";
import "./ManageRegistrations.css";
import logo from '../images/logo.jpeg'; 

const ManageRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch registrations on page load
  useEffect(() => {
    fetch("http://localhost:8080/api/event-registrations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching registrations");
        }
        return response.json(); // Ensure this is valid JSON
      })
      .then((data) => {
        const updatedData = data.map((registration) => ({
          ...registration,
          status: registration.status || "Pending",
          message: registration.message || "",
          isSubmitting: false, // Track submission state for each registration
        }));
        setRegistrations(updatedData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Handle status or message change
  const handleInputChange = (registerId, field, value) => {
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((registration) =>
        registration.registerId === registerId
          ? { ...registration, [field]: value }
          : registration
      )
    );
  };

  // Handle form submission
  const handleSubmit = (registerId) => {
    const registration = registrations.find(
      (registration) => registration.registerId === registerId
    );

    // Set the specific registration's submission state to true
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((reg) =>
        reg.registerId === registerId ? { ...reg, isSubmitting: true } : reg
      )
    );

    fetch(`http://localhost:8080/api/event-registrations/${registerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: registration.status,
        message: registration.message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error updating registration: ${text}`);
          });
        }
        return response.text(); // Return plain text response from the backend
      })
      .then((message) => {
        // Update the status and message for the specific registration
        setRegistrations((prevRegistrations) =>
          prevRegistrations.map((reg) =>
            reg.registerId === registerId
              ? { ...reg, status: registration.status, message: registration.message }
              : reg
          )
        );
        alert(message); // Show success message from the backend
      })
      .catch((error) => {
        alert(`Failed to update status and message: ${error.message}`);
      })
      .finally(() => {
        // Reset isSubmitting state for the specific registration
        setRegistrations((prevRegistrations) =>
          prevRegistrations.map((reg) =>
            reg.registerId === registerId ? { ...reg, isSubmitting: false } : reg
          )
        );
      });
  };

  // Function to get participants and handle empty/null values
  const getParticipants = (registration) => {
    const participants = [
      registration.participant1,
      registration.participant2,
      registration.participant3,
      registration.participant4,
      registration.participant5,
    ].filter((participant) => participant && participant.trim() !== "");

    return participants.length > 0 ? participants.join(", ") : "No participants";
  };

  return (
    <div id="manage-registrations-container">
            <header id="headadmin">
            <div id="logo">
            <a href="/admin">
                <img src={logo} alt="Sahya College Logo" id="logo-img" />
            </a> 
        </div>
                <div id="tt">Sahya College Fest</div>
            </header>
            <h2 className="page-heading" id="registrations-heading" style={{ fontSize: "1.6rem", marginTop: "80px", textAlign: "center" }}>
  Manage Registrations
</h2>

      {isLoading ? (
        <p>Loading registrations...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : registrations.length > 0 ? (
        <table className="registrations-table" id="registrations-table">
          <thead>
            <tr>
              <th>Registration ID</th>
              <th>Event Name</th>
              <th>College Name</th>
              <th>Participants</th>
              <th>Status</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration.registerId}>
                <td>{registration.registerId}</td>
                <td>{registration.eventName}</td>
                <td>{registration.collegeName}</td>
                <td>{getParticipants(registration)}</td>
                <td>
                  <select
                    className="status-dropdown"
                    value={registration.status}
                    onChange={(e) =>
                      handleInputChange(
                        registration.registerId,
                        "status",
                        e.target.value
                      )
                    }
                    id={`status-dropdown-${registration.registerId}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="message-input"
                    value={registration.message}
                    placeholder="Type a message"
                    onChange={(e) =>
                      handleInputChange(
                        registration.registerId,
                        "message",
                        e.target.value
                      )
                    }
                    id={`message-input-${registration.registerId}`}
                  />
                </td>
                <td>
                  <button
                    className="submit-button"
                    onClick={() => handleSubmit(registration.registerId)}
                    disabled={registration.isSubmitting} // Disable button during submission for each row
                    id={`submit-button-${registration.registerId}`}
                  >
                    {registration.isSubmitting ? "Submitting..." : "Save"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registrations found.</p>
      )}
       <footer id="foot">
                <p  style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
            </footer>
    </div>
  );
};

export default ManageRegistrations;
