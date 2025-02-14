import React from "react";
 import "./Dashboard.css";// Import CSS for styling
import homevi from "../videos/homevi.mp4"; // Import the video file
import homesec from "../images/homesec.jpg"; // Import the image file
import galleryImage1 from "../images/galleryImage1.jpg"; // Gallery Image 1
import galleryImage2 from "../images/galleryImage2.jpg"; // Gallery Image 2
import galleryImage3 from "../images/galleryImage3.jpg"; // Gallery Image 3
import galleryImage4 from "../images/galleryImage4.jpg"; // Gallery Image 4
import galleryImage5 from "../images/galleryImage5.jpg"; // Gallery Image 5
import galleryImage6 from "../images/galleryImage6.jpg"; // Gallery Image 6
import galleryImage7 from "../images/galleryImage7.jpg"; // Gallery Image 7
import galleryImage8 from "../images/galleryImage8.jpg"; // Gallery Image 8
import webdev from "../images/webdev.jpg"; // Gallery Image 8
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';
import mm from '../images/mm.jpg';
 // Add this import

const Dashboard = () => {
 
  const loggedInEmail = sessionStorage.getItem("loggedInEmail");
  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="head">
      <div id="logooo">
            <a href="/dash">
                <img src={logo} alt="Sahya College Logo" id="logoimg" />
            </a> 
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><Link to="/event">Events</Link></li> {/* Link to Events Page */}
            <li><a href="/booking-history">History</a></li>
            <li><Link to="/noti">Notification</Link></li> {/* Link to Events Page */}
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
       
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <video
            className="hero-video"
            src={homevi}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>
{/* About Us Section */}
<section className="about-section section-padding" id="about">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-12 mb-4 mb-lg-0 d-flex align-items-center">
      <div className="services-info">
  <h2 style={{ color: 'white' }} className="text-white mb-4">About Us</h2>
  <p className="text-white" style={{ color: 'white' }}>
  The Sahya College Fest at Marian College Kuttikkanam is one of the most awaited events of the year, 
  known for its vibrant celebration of youth, creativity, and talent. Organized annually by the students 
  of Marian College, the festival provides a platform for students to showcase their skills in various 
  cultural, artistic, and intellectual fields. 

  <br /><br />

  At Sahya College Fest, we bring together students from all walks of life to celebrate diversity, 
  creativity, and collaboration. Our goal is to create an inclusive atmosphere where everyone feels 
  inspired and motivated. Beyond competitions, the event serves as a hub for networking, learning, and 
  self-expression. 
   "Sahya College Fest isn’t just about competition – 
  it’s about building friendships, learning from one another, and celebrating the spirit of youth."
</p>

</div>
</div>


      {/* Image Section */}
      <div className="col-lg-6 col-12">
        <div className="about-text-wrap">
          <img
            src={homesec}  // Make sure 'homesec' is correctly defined in your code
            className="about-image img-fluid"
            alt="about-image"
          />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Display the Session Variable */}
      {loggedInEmail&& (
        <section className="welcome-message">
          <div className="container text-center">
          </div>
        </section>
      )}
      {/* Gallery Section */}
      <section className="artists-section section-padding" id="gallery">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h2 className="gallery-heading">Gallery</h2>
            </div>
          </div>

          {/* Gallery Images - These images should only appear here */}
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={galleryImage1} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Event Name:</strong> Classical Dance</p>
                  <p><strong>Location:</strong> Magis Auditorium</p>
                  <p><strong>Special Guest:</strong> Samir</p>
                  <hr />
       
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={galleryImage2} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Event Name:</strong> Western Musical</p>
                  <p><strong>Location:</strong> Conference Hall</p>
                  <p><strong>Special Guest:</strong> Arun</p>
                  <hr />
                 
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={galleryImage3} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Event Name:</strong> Kathakali</p>
                  <p><strong>Location:</strong>Open Stage</p>
                  <p><strong>Special Guest:</strong> Meera</p>
                  <hr />
  
                </div>
              </div>
            </div>

            {/* Additional New Gallery Images */}
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={galleryImage4} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Event Name:</strong> Musical</p>
                  <p><strong>Location:</strong> Magis</p>
                  <p><strong>Special Guest:</strong> Pradeep Kumar</p>
                  <hr />
                
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={galleryImage5} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Virtual Experience:</strong> Event 5</p>
                  <p><strong>Location:</strong> BCA Clasroom</p>
                  <p><strong>Special Guest:</strong> Jesna Jose</p>
                 
                  <hr />
          
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={galleryImage6} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Event Name:</strong> Music</p>
                  <p><strong>Location:</strong> Magis</p>
                  <p><strong>Special Guest:</strong> Adhil Khan</p>
                 
                  <hr />
                  
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={galleryImage7} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Event Name:</strong> Treasure Hunt:</p>
                  <p><strong>Location:</strong> Marian Campus :</p>
                  <p><strong>Special Guest:</strong> Ramya</p>
                  
                 
                  <hr />
                 
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={webdev} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Event Name:</strong> Hackathon</p>
                  <p><strong> Location :</strong> MIM Conference Hall</p>
                  <p><strong>Special Guest:</strong> Sheethal </p>
                  <hr />
                  
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src={galleryImage8} className="artists-image img-fluid" alt="img" />
                </div>
                <div className="artists-hover">
                  <p><strong>Event Name:</strong> Web Development</p>
                  <p><strong>Location:</strong>Conference Hall</p>
                  <p><strong>Special Guest:</strong> Salman Faris</p>
            
                  <hr />
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section" id="contact">
      <div className="concon">
        {/* Left Section - Logo & Social Icons */}
        <div className="college-info">

        <img src={mm}alt="mm"className="college-logo" />
          <div className="social-icons">
            <a href="https://www.facebook.com/mariancollegeofficial/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCs4nPaNUOC2bi4SM83KwTsA" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com/sahya.24?igsh=MTFoeGFzMTlub2h5dA==" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/school/marian-college-kuttikkanam/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/marian_college" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        {/* Center Section - Google Map */}
        <div className="map-container">
          <iframe
            title="Marian College Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.137874605944!2d76.96905737507265!3d9.58338179050179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b064dc8bda5cb29%3A0x3d161914b6967f9!2sMarian%20College%20Kuttikkanam%20(Autonomous)!5e0!3m2!1sen!2sin!4v1738509708899!5m2!1sen!2sin"
            width="350"
            height="200"
            style={{ border: "0", borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Right Section - Contact Details */}
        <div className="contact-info">
          <h3>GET IN TOUCH</h3>
          <p  style={{ color: 'white' }} ><i className="fas fa-phone"></i>  Reception - +91 7594971004</p>
          <p  style={{ color: 'white' }}><i className="fas fa-phone"></i> Admissions - +91 7594971020</p>
          <p  style={{ color: 'white' }}><i className="fas fa-envelope"></i> mariancollege@mariancollege.org</p>
          <p  style={{ color: 'white' }}><i className="fas fa-map-marker-alt"></i> Kuttikkanam P.O., Peermade, Idukki, Kerala, India</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p  style={{ color: 'white' }}>&copy; 2024 All Rights Reserved | Marian College Kuttikkanam Autonomous |</p>
        
      </footer>

      {/* Floating Social Media Sidebar */}
      <div className="social-sidebar">
        <a href="https://www.facebook.com/mariancollegeofficial/"><i className="fab fa-facebook"></i></a>
        <a href="https://www.youtube.com/channel/UCs4nPaNUOC2bi4SM83KwTsA"><i className="fab fa-youtube"></i></a>
        <a href="https://www.instagram.com/sahya.24?igsh=MTFoeGFzMTlub2h5dA=="><i className="fab fa-instagram"></i></a>
        <a href="https://www.linkedin.com/school/marian-college-kuttikkanam/"><i className="fab fa-linkedin"></i></a>
        <a href="https://twitter.com/marian_college"><i className="fab fa-twitter"></i></a>
      </div>

      {/* Back to Top Button */}
      <a href="#" className="back-to-top">
        <i className="fas fa-arrow-up"></i>
      </a>
    </section>
    </div>
  );
};

export default Dashboard;
