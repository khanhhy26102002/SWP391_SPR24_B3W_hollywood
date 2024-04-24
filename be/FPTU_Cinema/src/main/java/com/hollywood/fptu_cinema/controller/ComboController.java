package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.ComboService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.viewModel.ComboDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

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

    //Goi tat ca cac danh chi tiet cua combo
    @Operation(summary = "List Combo")
    @GetMapping("/listCombo")
    //do phan hoi tu may chu tra ve nen xai response
    public ResponseEntity<?> listCombo() {
        try {
            List<ComboDTO> combo = comboService.listCombo().stream()
                    .map(ComboDTO::new) // Thay thế constructor reference bằng lambda expression
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

    //Danh sach chi tiet cua 1 combo (Combo chi tiet thi chi co admin và staff coi được)
    @Operation(summary = "Get Combo Detail")
    @GetMapping("detail/{comboId}")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> getComboDetails(@PathVariable int comboId) {
        try {
            //goi bien moi cho combo request (tra ve dto la co the giau duoc)
            ComboDTO comboDetails = new ComboDTO(comboService.getComboDetails(comboId));
            return Response.success(comboDetails);
        } catch (RuntimeException e) {
            logger.error("An error occurred while getting combo detail with ID {}: {}", comboId, e.getMessage());
            return Response.error(e);
        }
    }

    // Xóa Combo theo trạng thái
    @Operation(summary = "Delete Combo")
    @DeleteMapping("delete/{comboId}")
    public ResponseEntity<?> deleteCombo(@PathVariable int comboId) {
        try {
            comboService.deleteCombo(comboId);
            return Response.success("Combo deleted successfully");
        } catch (RuntimeException e) {
            logger.error("An error occurred while deleting combo with ID {}: {}", comboId, e.getMessage());
            return Response.error(e);
        }
    }
}