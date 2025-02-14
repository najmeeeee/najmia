import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Dash.css';
import band from "../images/band.jpg"; // Gallery Image 8
import danco from "../images/danco.jpg";
import webdev from "../images/webdev.jpg";
import sbi from "../images/sbi.jpg";
import tata from "../images/tata.jpg";
import malabar from "../images/malabar.jpg";
import santa from "../images/santa.jpg";
import milma from "../images/milma.jpg";
import info from "../images/info.jpg";
import bsnl from "../images/bsnl.jpg";
import hdfc from "../images/hdfc.jpg";
import logo from "../images/logo.jpeg";
import '@fortawesome/fontawesome-free/css/all.min.css';

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem('loggedInEmail') || Cookies.get('loggedInEmail');
    const userRole = sessionStorage.getItem('userRole') || Cookies.get('userRole');

    if (loggedInEmail && userRole) {
      // Redirect to the appropriate dashboard based on role
      if (String(userRole) === '2') {
        navigate('/admin', { replace: true }); // Redirect to admin dashboard
      } else if (String(userRole) === '1') {
        navigate('/dashboard', { replace: true }); // Redirect to user dashboard
      }
    }
  }, [navigate]);

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date('2025-11-10T10:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            {/* Logo content */}
          </div>
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#home">Home</a>
            <a href="#events">Events</a>
            <a href="#sponsors">Sponsors</a>
            <a href="#contact">Contact</a>
            <a href="/login" className="get-started-btn">Get Started</a>
          </div>
          <div 
            className="mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Marian College Fest 2025</h1>
          <p style={{ color: 'white' }} className="tagline">Ignite Your Passion | Create Memories</p>
          <p style={{ color: 'white' }} className="location">Kuttikkanam, Idukki, Kerala</p>
          
          <div className="countdown-container">
            <div className="countdown-header">Event Starts In</div>
            <div className="countdown">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="countdown-item">
                  <div className="countdown-value">{String(value).padStart(2, '0')}</div>
                  <div className="countdown-label">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events" id="events">
        <h2 className="section-title">Featured Events</h2>
        <div className="events-grid">
          <div className="event-card">
            <img src={band} alt="Battle of Bands" className="event-image" />
            <div className="event-content">
              <h3>Battle of Bands</h3>
              <p>Showcase your musical talent and compete with the best bands from colleges across Kerala.</p>
              <div className="event-details">
                <span style={{ color: 'blue' }}> Sep 12, 2025</span>
                <span style={{ color: 'blue' }}> 11:00 AM</span>
              </div>
            </div>
          </div>

          <div className="event-card">
            <img src={danco} alt="Dance Revolution" className="event-image" />
            <div className="event-content">
              <h3>Dance Revolution</h3>
              <p>Let the rhythm guide you in this spectacular dance competition featuring various styles.</p>
              <div className="event-details">
                <span style={{ color: 'blue' }}> Sep 10, 2025</span>
                <span style={{ color: 'blue' }}> 10:00 AM</span>
              </div>
            </div>
          </div>

          <div className="event-card">
            <img src={webdev} alt="Tech Summit" className="event-image" />
            <div className="event-content">
              <h3>Tech Summit</h3>
              <p>Dive into the world of technology with workshops, hackathons, and exciting tech competitions.</p>
              <div className="event-details">
                <span style={{ color: 'blue' }}> Sep 12, 2025</span>
                <span style={{ color: 'blue' }}> 9:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors" id="sponsors">
        <h2 className="section-title">Our Sponsors</h2>
        <div className="sponsors-grid">
          {[tata, santa, malabar, sbi, hdfc, info, milma, bsnl].map((image, index) => (
            <div key={index} className="sponsor-card">
              <img src={image} alt={`Sponsor ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contactda" id="contactda">
        <div className="contactda-container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contactda-content">
            <div className="contactda-info">
              <div className="contactda-details">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3 style={{ color: 'blue' }}>Location</h3>
                  <p>Marian College Kuttikkanam</p>
                  <p>Kuttikkanam P.O., Peermade</p>
                  <p>Idukki, Kerala - 685531</p>
                </div>
              </div>
              <div className="contactda-details">
                <i className="fas fa-phone"></i>
                <div>
                  <h3 style={{ color: 'blue' }}>Phone</h3>
                  <p>Event Coordinator: +91 98765 43210</p>
                  <p>Office: +91 12345 67890</p>
                  <p>Office: +91 12345 67890</p>
                </div>
              </div>
              <div className="contactda-details">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3 style={{ color: 'blue' }}>Email</h3>
                  <p>fest@mariancollege.edu.in</p>
                  <p>info@mariancollege.edu.in</p>
                  <p>Office: +91 12345 67890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3 style={{ color: 'black' }}>Quick Links</h3>
            <ul>
              <li><a style={{ color: 'blue' }} href="#home">Home</a></li>
              <li><a style={{ color: 'blue' }} href="#events">Events</a></li>
              <li><a style={{ color: 'blue' }} href="#sponsors">Sponsors</a></li>
              <li><a style={{ color: 'blue' }} href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-logo">
            <img src={logo} alt="Marian College Fest Logo" />
          </div>

          <div className="footer-section">
            <a href="/login" className="get-started-btn">Get Started</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Marian College Fest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;