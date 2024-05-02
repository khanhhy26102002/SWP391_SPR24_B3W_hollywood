package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.Combo;
import com.hollywood.fptu_cinema.service.ComboService;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/combo")
public class ComboController {
    private static final Logger logger = LogManager.getLogger(ComboController.class);
    private final ComboService comboService;

    public ComboController(ComboService comboService) {
        this.comboService = comboService;
    }

    @Operation(summary = "Get Combo Detail")
    @GetMapping("/detail/{ComboId}")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    public ResponseEntity<?> getComboDetails(@PathVariable int ComboId) {
        try {
            Combo combo = comboService.findById(ComboId);
            return Response.success(combo);
        } catch (Exception e) {
            logger.error("An error occurred while getting combo detail with ID {}: {}", ComboId, e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Get Combo List")
    @GetMapping("/getComboList")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    public ResponseEntity<?> getListCombo(){
        try {
            List<Combo> comboList = comboService.findAll();
            return Response.success(comboList);
        } catch (Exception e) {
            logger.error("An error occurred while getting combo list: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
