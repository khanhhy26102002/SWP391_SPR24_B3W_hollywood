package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.config.security.CustomUserDetails;
import com.hollywood.fptu_cinema.model.User;
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
            User user = userService.login(loginValue, password);
            CustomUserDetails userDetails = new CustomUserDetails(user);
            String token = jwtTokenProvider.generateToken(userDetails);
            return Response.success(new JwtAuthenticationResponse(token));
        } catch (Exception e) {
            logger.error("Login attempt failed for user with phone/email: {}", loginValue);
            return Response.error(e);
        }
    }

    @Operation(summary = "Logout")
    @GetMapping("/logout")
    @Secured({"ADMIN", "MEMBER", "STAFF"})
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            userService.logout(request);
            logger.info("{} logged out successfully!", userIdString);
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
        User currentUser = null;
        try {
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            Integer userId = Integer.parseInt(userIdString);
            currentUser = userService.findUserById(userId);
            userService.changePassword(currentUser.getUserName(), passwordChangeRequest.getOldPassword(), passwordChangeRequest.getNewPassword());
            return Response.success("Password changed successfully");
        } catch (IllegalArgumentException e) {
            logger.error("Invalid old password provided for user: {}", currentUser != null ? currentUser.getUserName() : "Unknown");
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
