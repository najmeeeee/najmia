import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import logo from '../images/logo.jpeg';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '',
        department: '',
        yearOfStudy: '',
        phoneNumber: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'name':
                if (!value) error = 'Name is required';
                else if (!/^[A-Za-z ]+$/.test(value)) error = 'Name should only contain alphabets';
                break;
            case 'email':
                if (!value) error = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(value)) error = 'Valid email is required';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                else if (value.length < 8) error = 'Password should be at least 8 characters';
                else if (!/[A-Za-z]/.test(value)) error = 'Password must contain at least one letter';
                else if (!/[0-9]/.test(value)) error = 'Password must contain at least one number';
                else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = 'Password must contain at least one special character';
                break;
            case 'confirmPassword':
                if (value !== formData.password) error = 'Passwords do not match';
                break;
            case 'studentId':
                if (!value) error = 'Student ID is required';
                else if (!/^[a-zA-Z0-9]{6,12}$/.test(value)) error = 'Student ID must be alphanumeric and between 6-12 characters';
                break;
            case 'department':
                if (!value) error = 'Department is required';
                else if (/[^a-zA-Z ]/.test(value)) error = 'Department should only contain alphabets';
                break;
            case 'yearOfStudy':
                if (!value) error = 'Year of study is required';
                else if (!/^[1-5]$/.test(value)) error = 'Year of study must be between 1 and 5';
                break;
            case 'phoneNumber':
                if (!value) error = 'Phone number is required';
                else if (!/^\d{10}$/.test(value)) error = 'Phone number must be a valid 10-digit number';
                break;
            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({ ...formData, [name]: value });

        // Validate the specific field and update errors
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:8080/api/users/register', formData);
                if (response.status === 201) {
                    navigate('/login'); // Navigate to login page on success
                } else {
                    setErrors({ general: 'Registration failed. Please try again.' });
                }
            } catch (err) {
                console.error(err);
                const errorMessage = err.response?.data || 'An error occurred. Please try again later.';
                setErrors({ general: errorMessage });
            }
        }
    };

    return (
        <div id="dashbody">
            <header id="header">
                <div id="logo">
                    <img src={logo} alt="Sahya College Logo" id="logo-img" /> {/* Imported image */}
                </div>
                <div id="tt">Welcome to Sahya College Fest</div>
            </header>
            <div className="register-page">
                <div className="register-form-container">
                    <h2>Register</h2>
                    {errors.general && <p className="error">{errors.general}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            placeholder="Student ID"
                        />
                        {errors.studentId && <p className="error">{errors.studentId}</p>}

                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Department"
                        />
                        {errors.department && <p className="error">{errors.department}</p>}

                        <input
                            type="text"
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            placeholder="Year of Study"
                        />
                        {errors.yearOfStudy && <p className="error">{errors.yearOfStudy}</p>}

                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                        <button type="submit">Register</button>
                    </form>
                    <p className="register-link" id="tt">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
                <footer id="foot">
                    <p  style={{ color: 'white' }}>2025 Sahya College Fest. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Register;
