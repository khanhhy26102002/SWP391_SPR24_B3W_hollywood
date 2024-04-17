package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.JwtAuthenticationResponse;
import com.hollywood.fptu_cinema.viewModel.PasswordChangeRequest;
import com.hollywood.fptu_cinema.viewModel.Response;
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

    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    //login
    @Operation(summary = "Login")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam("loginValue") String loginValue, @RequestParam("password") String password) {
        try {
            String token = userService.login(loginValue, loginValue, password);
            if (token != null) {
                return Response.success(new JwtAuthenticationResponse(token));
            } else {
                return Response.error(new Exception("Invalid login credentials"));
            }
        } catch (Exception e) {
            logger.error("Login attempt failed for user: {}", loginValue);
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
}
