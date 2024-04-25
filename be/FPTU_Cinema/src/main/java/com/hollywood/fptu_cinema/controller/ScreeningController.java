package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.Screening;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.service.ScreeningService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.Response;
import com.hollywood.fptu_cinema.viewModel.ScreeningDTO;
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
@RequestMapping(path = "api/screening")
public class ScreeningController {
    private static final Logger logger = LogManager.getLogger(ScreeningController.class);
    private final ScreeningService screeningService;
    private final UserService userService;

    public ScreeningController(ScreeningService screeningService, UserService userService) {
        this.screeningService = screeningService;
        this.userService = userService;
    }

    //Danh sach tat ca xuat chieu
    @Operation(summary = "List Screening Movie")
    @GetMapping("/listScreeningMovie")
    //do phan hoi tu may chu tra ve nen xai responseentity
    public ResponseEntity<?> listScreening() {
        try {
            List<ScreeningDTO> screeningDTOS = screeningService.listScreenings().stream()
                    .map(ScreeningDTO::new) // Sử dụng lambda expression thay thế constructor reference
                    .collect(Collectors.toList());

            if (screeningDTOS.isEmpty()) {
                return Response.error(new Exception("No screenings found"));
            }

            return Response.success(screeningDTOS);
        } catch (Exception e) {
            logger.error("An error occurred while listing screenings: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Danh sach chi tiet cua 1 xuat chieu
    @Operation(summary = "Get Screening Detail")
    @GetMapping("detail/{screeningId}")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> getMovieDetail(@PathVariable int screeningId) {
        try {
            //goi bien moi cho screening request (tra ve dto la co the giau duoc)
            ScreeningDTO screeningDetails = new ScreeningDTO(screeningService.getScreeningDetails(screeningId));
            return Response.success(screeningDetails);
        } catch (RuntimeException e) {
            logger.error("An error occurred while getting screening detail with ID {}: {}", screeningId, e.getMessage());
            return Response.error(e);
        }
    }

    //Ham delete theo kieu status(Trang thai bang 0 la an khac khong van hien)
    @Operation(summary = "Delete Screening")
    @DeleteMapping("delete/{screeningId}")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> deleteScreening(@PathVariable int screeningId) {
        try {
            screeningService.deleteScreening(screeningId);
            return Response.success("Screening deleted successfully");
        } catch (RuntimeException e) {
            logger.error("An error occurred while deleting screening with ID {}: {}", screeningId, e.getMessage());
            return Response.error(e);
        }
    }

    //Tao moi 1 xuat chieu phim
    @Operation(summary = "Create a new Screening")
    @PostMapping("/createScreening")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> createMovie(@Valid @RequestBody ScreeningDTO screeningDTO) {
        try {
            //lay cai name cua nguoi dang nhap vo , gan vao bien username
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            Integer userId = Integer.parseInt(userIdString);
            User currentUser = userService.findUserById(userId);

            ScreeningDTO screening = new ScreeningDTO(screeningService.createScreening(screeningDTO, currentUser));
            return Response.success(screening);
        } catch (Exception e) {
            logger.error("An error occurred while creating the Screening: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Update xuat chieu phim
    @Operation(summary = "Update screening")
    @PutMapping("/updateScreening/{screeningId}")
    // Thêm {movieId} vào đường dẫn để nhận giá trị từ đường dẫn của yêu cầu HTTP
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> updateMovie(@PathVariable int screeningId, @Valid @RequestBody ScreeningDTO screeningDTO) {
        try {
            Screening screening = screeningService.findById(screeningId);
            // Gọi phương thức updateMovie từ service
            if (screening == null) {
                throw new Exception("Screening not found");
            }
            //current user xai token

            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated"); // Ném ngoại lệ nếu không có người dùng nào được xác thực
            }
            Integer userId = Integer.parseInt(userIdString);
            //tim kiem ten nguoi dung va ket qua tra ve 1 optional
            User currentUser = userService.findUserById(userId);
            screeningService.updateScreening(screeningDTO, screening, currentUser);
            logger.info("Screening updated successfully");
            // Trả về phản hồi thành công với thông tin của bộ phim đã cập nhật
            return Response.success(screeningDTO);
        } catch (Exception e) {
            logger.error("An error occurred while updating screening: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
