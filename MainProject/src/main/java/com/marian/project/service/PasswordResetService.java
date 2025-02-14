package com.marian.project.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.marian.project.model.ResetToken;
import com.marian.project.model.User; // Assuming you have a User model
import com.marian.project.repository.ResetTokenRepository;
import com.marian.project.repository.UserRepository; // Assuming you have a UserRepository

import jakarta.transaction.Transactional;

@Transactional
@Service
public class PasswordResetService {

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository; // For updating the user password

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // For password encryption

    public String createResetToken(String email) {
        String token = UUID.randomUUID().toString();
        ResetToken resetToken = new ResetToken();
        resetToken.setEmail(email);
        resetToken.setToken(token);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(30));
        resetTokenRepository.save(resetToken);

        String subject = "Password Reset Request";
        String body = "Your password reset token is: " + token + "\nThis token is valid for 30 minutes.";
        emailService.sendEmail(email, subject, body);

        return token; // Optional: return token for testing
    }

    public boolean resetPassword(String token, String newPassword) {
        Optional<ResetToken> tokenData = resetTokenRepository.findByToken(token);

        if (tokenData.isPresent() && tokenData.get().getExpiryDate().isAfter(LocalDateTime.now())) {
            ResetToken resetToken = tokenData.get();
            Optional<User> userOptional = userRepository.findByEmail(resetToken.getEmail());

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                String encodedPassword = passwordEncoder.encode(newPassword); // Hash the password
                user.setPassword(encodedPassword); // Update the password
                userRepository.save(user); // Save the updated user
                resetTokenRepository.deleteByToken(token); // Delete the token after use
                return true;
            }
        }
        return false;
    }
}
