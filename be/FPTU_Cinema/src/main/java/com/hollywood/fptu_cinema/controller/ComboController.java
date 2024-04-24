package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.ComboService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.viewModel.ComboRequest;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping(path = "api/combo")
public class ComboController {
    private static final Logger logger = LogManager.getLogger(ComboController.class);
    //Lay Service ben class movie service len
    private final ComboService comboService;

    //Tao constructor
    public ComboController(ComboService comboService, UserService userService) {
        this.comboService = comboService;
    }

    //Goi tat ca cac danh sach phim ra
    @Operation(summary = "List Combo")
    @GetMapping("/listcombo")
    //do phan hoi tu may chu tra ve nen xai response
    public ResponseEntity<?> listCombo() {
        try {
            List<ComboRequest> combo = comboService.listCombo().stream()
                    .map(ComboRequest::new) // Thay thế constructor reference bằng lambda expression
                    .collect(Collectors.toList());
            if (combo.isEmpty()) {
                return Response.error(new Exception("No combo found"));
            }
            return Response.success(combo);
        } catch (Exception e) {
            logger.error("An error occurred while listing combo: {}", e.getMessage());
            return Response.error(e);
        }
    }
}