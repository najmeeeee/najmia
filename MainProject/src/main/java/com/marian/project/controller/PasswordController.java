package com.marian.project.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.marian.project.service.PasswordResetService;

@RestController
@RequestMapping("/api/password")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}) // Allows CORS for all origins
public class PasswordController {

    @Autowired
    private PasswordResetService passwordResetService;

    // Endpoint to request a password reset
    @PostMapping("/request-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        try {
            passwordResetService.createResetToken(email);
            return ResponseEntity.ok("Reset token sent to your email.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send reset token. Please check the email address.");
        }
    }

    // Endpoint to reset the password using the token
    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        if (token == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Token and newPassword are required.");
        }

        boolean success = passwordResetService.resetPassword(token, newPassword);
        return success ? ResponseEntity.ok("Password updated successfully.")
                       : ResponseEntity.badRequest().body("Invalid or expired token.");
    }
}
