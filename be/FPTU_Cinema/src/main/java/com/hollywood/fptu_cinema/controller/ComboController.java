package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.Combo;
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

@RestController()
@RequestMapping(path = "api/combo")
public class ComboController {
    private static final Logger logger = LogManager.getLogger(ComboController.class);
    //Lay Service ben class movie service len
    private final ComboService comboService;
    private final UserService userService;

    //Tao constructor
    public ComboController(ComboService comboService, UserService userService) {
        this.comboService = comboService;
        this.userService = userService;
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

    //Tao moi 1 combo
    @Operation(summary = "Create a new Combo")
    @PostMapping("/createCombo")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> createCombo(@Valid @RequestBody ComboDTO comboDTO) {
        try {
            //lay cai name cua nguoi dang nhap vo , gan vao bien username
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            Integer userId = Integer.parseInt(userIdString);
            User currentUser = userService.findUserById(userId);

            ComboDTO combo = new ComboDTO(comboService.createCombo(comboDTO, currentUser));
            return Response.success(combo);
        } catch (Exception e) {
            logger.error("An error occurred while creating the combo: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Update 1 combo
    @Operation(summary = "Update Combo")
    @PutMapping("/updateCombo/{comboId}")
    // Thêm {movieId} vào đường dẫn để nhận giá trị từ đường dẫn của yêu cầu HTTP
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> updateCombo(@PathVariable int comboId, @Valid @RequestBody ComboDTO comboDTO) {
        try {
            Combo combo = comboService.findById(comboId);
            // Gọi phương thức updateCombo từ service
            if (combo == null) {
                throw new Exception("Combo not found");
            }
            //current user xai token

            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated"); // Ném ngoại lệ nếu không có người dùng nào được xác thực
            }
            Integer userId = Integer.parseInt(userIdString);
            //tim kiem ten nguoi dung va ket qua tra ve 1 optional
            User currentUser = userService.findUserById(userId);
            comboService.updateCombo(comboDTO, combo, currentUser);
            logger.info("Combo updated successfully");
            // Trả về phản hồi thành công với thông tin của combo dã cập nhật
            return Response.success(comboDTO);
        } catch (Exception e) {
            logger.error("An error occurred while updating combo: {}", e.getMessage());
            return Response.error(e);
        }
    }
}