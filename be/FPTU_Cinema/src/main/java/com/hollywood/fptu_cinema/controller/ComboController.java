package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.service.ComboService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.ComboDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/combo")
public class ComboController {
    private static final Logger logger = LogManager.getLogger(ComboController.class);
    private final ComboService comboService;
    private final UserService userService;

    public ComboController(ComboService comboService, UserService userService) {
        this.comboService = comboService;
        this.userService = userService;
    }

    @Operation(summary = "Get Combo Detail")
    @GetMapping("/detail/{ComboId}")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    public ResponseEntity<?> getComboDetails(@PathVariable int ComboId) {
        try {
            ComboDTO combo = new ComboDTO(comboService.findById(ComboId));
            return Response.success(combo);
        } catch (Exception e) {
            logger.error("An error occurred while getting combo detail with ID {}: {}", ComboId, e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Get Combo List")
    @GetMapping("/getComboList")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    public ResponseEntity<?> getListCombo() {
        try {
            List<ComboDTO> comboList = comboService.findAll().stream()
                    .map(ComboDTO::new)
                    .collect(Collectors.toList());
            if (comboList.isEmpty()) {
                return Response.error(new Exception("No combo found"));
            }
            return Response.success(comboList);
        } catch (Exception e) {
            logger.error("An error occurred while getting combo list: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Delete Combo")
    @PostMapping("/delete/{ComboId}")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> deleteCombo(@PathVariable int ComboId) {
        try {
            comboService.deleteCombo(ComboId);
            return Response.success("Delete Combo Success");
        } catch (Exception e) {
            logger.error("An error occurred while deleting combo: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Create Combo")
    @PostMapping("/createCombo")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> createCombo(@Valid @RequestBody ComboDTO comboDTO) {
        try {
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            Integer userId = Integer.parseInt(userIdString);
            User currentUser = userService.findUserById(userId);
            comboService.createCombo(currentUser, comboDTO);
            return Response.success(comboDTO);
        } catch (Exception e) {
            logger.error("An error occurred while creating combo: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Update Combo")
    @PostMapping("/updateCombo/{ComboId}")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    public ResponseEntity<?> updateCombo(@PathVariable int ComboId, @Valid @RequestBody ComboDTO comboDTO) {
        try {
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            Integer userId = Integer.parseInt(userIdString);
            User currentUser = userService.findUserById(userId);
            comboService.updateCombo(ComboId, currentUser, comboDTO);
            return Response.success(comboDTO);
        } catch (Exception e) {
            logger.error("An error occurred while updating combo: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
