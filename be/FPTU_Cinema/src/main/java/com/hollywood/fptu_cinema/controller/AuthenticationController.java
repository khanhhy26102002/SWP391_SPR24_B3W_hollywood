package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.enums.Role;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/auth")
public class AuthenticationController {
    private static final Logger logger = LogManager.getLogger(AuthenticationController.class);

    @Operation(summary = "logout")
    @GetMapping("/logout")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            logger.info("{} try to logout!", Util.currentUser());
            userService.logout(request);
            logger.info("logout success!");
            return Response.success(null);
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return Response.error(e);
        }
    }
}
