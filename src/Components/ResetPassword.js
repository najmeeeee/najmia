import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ResetPassword.css'; // Import the CSS file

const ResetPassword = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/password/reset',
                { token, newPassword },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            // Log the response for debugging
            console.log(response.data);

            // Set the response message
            setMessage(response.data);

            // Check if the response indicates success
            if (response.data.trim() === "Password reset successfully.") {
                console.log("Redirecting to login page..."); // Debugging
                setTimeout(() => {
                    console.log("Navigating now..."); // Debugging
                    navigate('/login'); // Redirect to the login page
                }, 2000);
            }
            
        } catch (error) {
            setMessage('Error resetting password.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form>
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter reset token"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                />
                <button type="button" onClick={handleResetPassword}>Reset Password</button>
            </form>
            {message && <p className={message === "Password reset successfully." ? "success" : ""}>{message}</p>}
            <p  style={{ color: 'black' }} className="log-link" id="tt">
                 Back to Login? <a  href="/login"> Login here</a>
             </p>
        </div>
     
       
    );
};

export default ResetPassword;