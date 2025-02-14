package com.marian.project.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marian.project.model.User;
import com.marian.project.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from your React frontend
public class AuthController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Login a user (check role in response)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        try {
            User user = userService.loginUser(email, password); // Login validation
            if (user != null) {
                // Prepare the response with role, email, and id
                Map<String, Object> response = Map.of(
                    "message", "Login successful",
                    "role", user.getRole(),  // Include the role
                    "email", user.getEmail(), // Include the email
                    "id", user.getId()       // Include the user ID
                );
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }
    
    @RequestMapping("/getUserId")
    public Long getUserIdFromSession(HttpSession session) {
        // Get the email from the session
        String email = (String) session.getAttribute("loggedInEmail");

        // Fetch the user ID based on the email
        if (email != null) {
            return userService.getUserIdByEmail(email);
        } else {
            throw new RuntimeException("User email not found in session");
        }
    }

    // Retrieve all users (admin access)
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();  // Ensure this fetches all fields
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }
   @GetMapping("/count")
    public ResponseEntity<Long> getTotalUsersCount() {
        try {
            long count = userService.getTotalUsersCount();  // Fetch the count of total users
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    
    }

}