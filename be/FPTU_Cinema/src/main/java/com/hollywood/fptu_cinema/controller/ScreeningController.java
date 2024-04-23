package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.Screening;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.service.MovieService;
import com.hollywood.fptu_cinema.service.ScreeningService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.*;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController()
@RequestMapping(path = "api/screening")
public class ScreeningController {
    private static final Logger logger = LogManager.getLogger(ScreeningController.class);
    private final ScreeningService screeningService;
    private final UserService userService;
    public ScreeningController(ScreeningService screeningService, UserService userService, UserService userService1) {
        this.screeningService = screeningService;
        this.userService = userService1;
    }
    //Danh sach tat ca xuat chieu
    @Operation(summary = "List Screening Movie")
    @GetMapping("/listScreeningMovie")
    //do phan hoi tu may chu tra ve nen xai responseentity
    public ResponseEntity<?> listScreening() {
        try {
            List<ScreeningRequest> screeningRequests = screeningService.listScreenings().stream()
                    .map(ScreeningRequest::new) // Sử dụng lambda expression thay thế constructor reference
                    .collect(Collectors.toList());

            if (screeningRequests.isEmpty()) {
                return Response.error(new Exception("No screenings found"));
            }

            return Response.success(screeningRequests);
        } catch (Exception e) {
            logger.error("An error occurred while listing screenings: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Danh sach chi tiet cua 1 xuat chieu
    @Operation(summary = "Get Screening Detail")
    @GetMapping("detail/{screeningId}")
    public ResponseEntity<?> getMovieDetail(@PathVariable int screeningId) {
        try {
            //goi bien moi cho screening request (tra ve dto la co the giau duoc)
            ScreeningRequest screeningDetails = new ScreeningRequest(screeningService.getScreeningDetails(screeningId));
            return Response.success(screeningDetails);
        } catch (RuntimeException e) {
            logger.error("An error occurred while getting screening detail with ID {}: {}", screeningId, e.getMessage());
            return Response.error(e);
        }
    }

    //Ham delete theo kieu status(Trang thai bang 0 la an khac khong van hien)
    @Operation(summary = "Delete Screening")
    @DeleteMapping("delete/{screeningId}")
    public ResponseEntity<?> deleteScreening(@PathVariable int screeningId) {
        try {
            screeningService.deleteScreening(screeningId);
            return Response.success("Screening deleted successfully");
        } catch (RuntimeException e) {
            logger.error("An error occurred while deleting screening with ID {}: {}", screeningId, e.getMessage());
            return Response.error(e);
        }
    }
    @Operation(summary = "Create a new Screening")
    @PostMapping("/createScreening")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> createMovie(@RequestBody ScreeningRequest screeningRequest) {
        try {
            //lay cai name cua nguoi dang nhap vo , gan vao bien username
            String username = Util.currentUser();
            if (username == null) {
                throw new Exception("User not authenticated");
            }
            Optional<User> currentUser = userService.findByUserName(username);
            if (currentUser.isEmpty()) {
                throw new Exception("User not found");
            }

            ScreeningRequest movie = new ScreeningRequest(screeningService.createScreening(screeningRequest, currentUser.orElse(null)));
            return Response.success(movie);
        } catch (Exception e) {
            logger.error("An error occurred while creating the Screening: {}", e.getMessage());
            return Response.error(e);
        }
    }



}
