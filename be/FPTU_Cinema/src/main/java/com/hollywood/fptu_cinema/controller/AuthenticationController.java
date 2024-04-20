package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.JwtTokenProvider;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.*;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping(path = "api/auth")
public class AuthenticationController {
    private static final Logger logger = LogManager.getLogger(AuthenticationController.class);
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationController(UserService userService, JwtTokenProvider jwtTokenProvider) {

        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    //login
    @Operation(summary = "Login")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam("loginValue") String loginValue, @RequestParam("password") String password) {
        try {
            String userName = userService.login(loginValue, password);
            String token = jwtTokenProvider.generateToken(userName);
            return Response.success(new JwtAuthenticationResponse(token));
        } catch (Exception e) {
            logger.error("Login attempt failed for user with phone/email: {}", loginValue);
            return Response.error(e);
        }
    }

    //logout
    @Operation(summary = "Logout")
    @GetMapping("/logout")
    @Secured({"ADMIN", "MEMBER", "STAFF"})
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            String username = Util.currentUser();
            userService.logout(request);
            logger.info("{} logged out successfully!", username);
            return Response.success("Logout successful");
        } catch (Exception e) {
            logger.error("Logout attempt failed: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Change password")
    @PostMapping("/changePassword")
    @Secured({"ADMIN", "MEMBER", "STAFF"})
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        String username = null;
        try {
            username = Util.currentUser();
            if (username == null) {
                return Response.error(new Exception("User not authenticated"));
            }
            userService.changePassword(username, passwordChangeRequest.getOldPassword(), passwordChangeRequest.getNewPassword());
            return Response.success("Password changed successfully");
        } catch (IllegalArgumentException e) {
            logger.error("Invalid old password provided for user: {}", username);
            return Response.error(new Exception("Invalid old password"));
        } catch (Exception e) {
            logger.error("Password change failed: {}", e.getMessage());
            return Response.error(new Exception("Password change failed"));
        }
    }

    @Operation(summary = "Forgot Password")
    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestParam("email") String email) {
        try {
            userService.initiateResetPassword(email);
            logger.info("Forgot password email sent to: {}", email);
            return Response.success("An email to reset your password has been sent to " + email + ". Please check your inbox.");
        } catch (Exception e) {
            logger.error("Failed to send forgot password email to: {}", email, e);
            return Response.error(new Exception("Failed to send forgot password email."));
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest passwordResetRequest) {
        try {
            userService.resetPassword(
                    passwordResetRequest.getToken(),
                    passwordResetRequest.getNewPassword(),
                    passwordResetRequest.getConfirmPassword()
            );
            logger.info("Password has been reset successfully");
            return Response.success("Password has been reset successfully.");
        } catch (IllegalArgumentException e) {
            logger.error(e.getMessage());
            return Response.error(new Exception(e.getMessage()));
        } catch (Exception e) {
            logger.error("Password reset failed: {}", e.getMessage());
            return Response.error(new Exception("Password reset failed."));
        }
    }

    @Operation(summary = "Refresh Access Token")
    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshAccessToken(@RequestParam("refreshToken") String refreshToken) throws SecurityException {
        try {
            // Validate the refresh token
            if (jwtTokenProvider.validateRefreshToken(refreshToken)) {// Extract the username from the refresh token
                String userName = jwtTokenProvider.extractUsername(refreshToken);
                // Generate a new access token
                String newAccessToken = jwtTokenProvider.generateToken(userName);
                return Response.success(new JwtAuthenticationResponse(newAccessToken));
            } else {
                throw new SecurityException("Invalid refresh token");
            }
        } catch (SecurityException e) {
            logger.error("Token refresh failed: {}", e.getMessage());
            return Response.error(new Exception("Token refresh failed"));
        } catch (Exception e) {
            logger.error("Unexpected error during token refresh: {}", e.getMessage());
            return Response.error(new Exception("Unexpected error during token refresh"));
        }
    }

    @Operation(summary = "Register new user")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDTO registrationDTO) {
        try {
            userService.register(registrationDTO);
            return Response.success("created successfully");
        } catch (Exception e) {
            logger.error("Registration attempt failed for user: {}", registrationDTO.getEmail(), e);
            return Response.error(new Exception("Registration failed."));
        }
    }
}
