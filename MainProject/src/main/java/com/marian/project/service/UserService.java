package com.marian.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.marian.project.model.User;
import com.marian.project.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;  // This should work now

    public void registerUser(String password) {
        String encodedPassword = passwordEncoder.encode(password);}// Inject password encoder

    // Register a new user (for normal users, role 1)
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        user.setRole(1);  // Default to regular user role
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Hash password before saving
        return userRepository.save(user);
    }

    // Login a user (both admin and regular user)
    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify the password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Check if the user is an admin (role 2)
        if (user.getRole() == 2) {
            // This is an admin user, handle admin login logic if needed
            // (you can add additional logic for admins if necessary)
            System.out.println("Admin logged in: " + email);
        }

        return user;  // Return the logged-in user object
    }

    // Retrieve all users (for admin)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

	public Long getUserIdByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	public long getTotalUsersCount() {
	    return userRepository.count();  // Assuming you're using Spring Data JPA
	}

   
}