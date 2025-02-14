import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import './Login.css';
import logo from '../images/logo.jpeg';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input changes for email and password
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // Handle form submission (login)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous session and cookies before setting new ones
        sessionStorage.clear();
        Cookies.remove('loggedInEmail');
        Cookies.remove('userRole');
        Cookies.remove('userId'); // Remove previous user ID from cookies if any

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', credentials);

            console.log("API Response:", response.data);  // Log the full response here

            if (response.status === 200) {
                const { role, id } = response.data;  // Get the role and id from the response

                // Assuming the email is passed separately in a different API call or stored in session
                const loggedInEmail = credentials.email;  // You can save the email in sessionStorage or cookies

                // Check if the role, id, and email are returned
                if (role && loggedInEmail && id) {
                    // Store email, role, and id in sessionStorage and cookies for session management
                    sessionStorage.setItem('loggedInEmail', loggedInEmail);
                    sessionStorage.setItem('userRole', role);
                    sessionStorage.setItem('userId', id);  // Store userId in sessionStorage
                    Cookies.set('loggedInEmail', loggedInEmail, { expires: 1, path: '/' });  // Cookie expires in 1 day
                    Cookies.set('userRole', role, { expires: 1, path: '/' });
                    Cookies.set('userId', id, { expires: 1, path: '/' });  // Store userId in cookies

                    // Debugging: Log the cookies and sessionStorage
                    console.log('Session:', sessionStorage);
                    console.log('Cookies:', Cookies.get());

                    // Convert role to string to ensure proper comparison
                    if (String(role) === '2') {
                        navigate('/admin'); // Redirect to admin dashboard
                    } 
                    if (String(role) === '1') {
                        navigate('/dashboard'); // Redirect to user dashboard
                    }
                } else {
                    setError('Invalid email, role, or id returned from API.');
                }
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid Credentials.';
            setError(errorMessage);
        }
    };

    // Check sessionStorage and cookies when the component mounts
    useEffect(() => {
        const loggedInEmail = sessionStorage.getItem('loggedInEmail') || Cookies.get('loggedInEmail');
        const userRole = sessionStorage.getItem('userRole') || Cookies.get('userRole');
        const userId = sessionStorage.getItem('userId') || Cookies.get('userId');

        if (loggedInEmail && userRole && userId) {
            // Convert role to string to ensure proper comparison
            if (String(userRole) === '2') {
                navigate('/admin');
            } else if (String(userRole) === '1') {
                navigate('/dashboard');
            }
        }
    }, [navigate]); // This effect runs when the component mounts

    return (
        <div id="dashbody">
            <header id="header">
            <div id="logo">
            <a href="/dash">
                <img src={logo} alt="Sahya College Logo" id="logo-img" />
            </a> 
        </div>
                <div id="tt">Welcome to Sahya College Fest</div>
            </header>

            <div className="login-form-container">
                <h2 id="tt">Welcome Back!</h2>
                <p id='tt'>Login to continue to Sahya College Fest</p>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="forgot-password-link" id="tt">
    <a href="/forgot-password">Forgot Password?</a>
</p>

                <p className="register-link" id="tt">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>

            <footer id="foot">
                <p  style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Login;