package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.viewModel.Response;
import com.hollywood.fptu_cinema.viewModel.UserDTO;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {
    private static final Logger logger = LogManager.getLogger(MovieController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "List Users")
    @GetMapping("/listUsers")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> listUsers() {
        try {
            List<UserDTO> users = userService.getAllUsersWithPermission();
            if (users.isEmpty()) {
                return Response.error(new Exception("No users found"));
            }
            return Response.success(users);
        } catch (Exception e) {
            logger.error("An error occurred while listing users: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Update User")
    @PutMapping("update/{userId}")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    public ResponseEntity<?> updateUser(@PathVariable("userId") Integer userId, @RequestBody UserDTO userDTO) {
        try {
            userService.updateUser(userId, userDTO);
            return Response.success("User updated successfully");
        } catch (Exception e) {
            logger.error("An error occurred while updating user: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Delete User")
    @DeleteMapping("delete/{userId}")
    @Secured({"ADMIN"})
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Integer userId) {
        try {
            userService.deleteUser(userId);
            return Response.success("User deleted successfully");
        } catch (Exception e) {
            logger.error("An error occurred while deleting user: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "User Profile")
    @GetMapping("getUserProfile/{userId}")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    public ResponseEntity<?> getUserProfile(@PathVariable("userId") Integer userId) {
        try {
            userService.getUserProfile(userId);
            return Response.success(userService.getUserProfile(userId));
        } catch (Exception e) {
            logger.error("An error occurred while getting user profile: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
