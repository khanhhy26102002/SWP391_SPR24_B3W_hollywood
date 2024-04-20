package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.UserRepository;
import com.hollywood.fptu_cinema.util.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.emailService = emailService;
    }


    public String login(String phone, String email, String password) throws Exception {
        Optional<User> userOptional = userRepository.findByPhoneOrEmail(phone, email);

        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            return userOptional.get().getUserName(); // Replace with appropriate username retrieval logic
        } else {
            throw new AccessDeniedException("Invalid login credentials");
        }
    }

    public void logout(HttpServletRequest request) {
        String token = getTokenFromHeader(request);
        if (token != null && !jwtTokenProvider.isTokenBlacklisted(token)) {
            jwtTokenProvider.invalidateToken(token);
        }
    }

    private String getTokenFromHeader(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("The old password is incorrect.");
        }
    }

    public User findByUserName(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }

    public void initiateResetPassword(String email) throws Exception {
        userRepository.findByEmail(email).ifPresentOrElse(user -> {
            String token = jwtTokenProvider.generateResetToken(user.getUserName());
            String resetPasswordLink = "http://localhost:8080/api/auth/resetPassword?token=" + token;
            try {
                emailService.sendResetPasswordEmail(email, resetPasswordLink);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }, () -> {
            throw new IllegalArgumentException("Email address not found.");
        });
    }

    public void resetPassword(String token, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match.");
        }
        if (!jwtTokenProvider.validateResetToken(token)) {
            throw new IllegalArgumentException("Invalid or expired reset token.");
        }

        String username = jwtTokenProvider.extractUsername(token);
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        // Assuming role check is necessary, ensure you have the logic to get the role ID
        if (!user.getRole().getRoleName().equals("MEMBER")) {
            throw new AccessDeniedException("You do not have permission to reset password.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}