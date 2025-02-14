import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ForgotPassword.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleRequestReset = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/password/request-reset', null, {
                params: { email },
            });

            setMessage(response.data); // Set the response message
            if (response.data === "Reset token sent to your email.") { // Check if the response is successful
                setTimeout(() => {
                    navigate('/reset-password'); // Redirect to /reset-password page after delay
                }, 2000); // 2-second delay for the user to see the message
            }
        } catch (error) {
            setMessage('Error requesting password reset.');
        }
    };

    return (

        
        
        <div className="forget-password-container">
            <h2>Forgot Password</h2>
            <form>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input-field"
                />
                <button 
                    type="button" 
                    onClick={handleRequestReset} 
                    className="reset-button"
                >
                    Send Reset Email
                </button>
                <p  style={{ color: 'black' }} className="log-link" id="tt">
                        Back to Login? <a  href="/login"> Login here</a>
                    </p>
            </form>
            {message && <p  className={message === "Reset token sent to your email." ? "success" : ""}>{message}</p>}
        </div>
    );

};

export default ForgetPassword;
