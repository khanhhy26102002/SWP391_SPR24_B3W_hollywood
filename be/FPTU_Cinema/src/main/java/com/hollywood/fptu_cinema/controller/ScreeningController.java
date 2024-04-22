package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.MovieService;
import com.hollywood.fptu_cinema.service.ScreeningService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.viewModel.MovieDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import com.hollywood.fptu_cinema.viewModel.ScreeningRequest;
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
    //do phan hoi tu may chu tra ve nen xai response
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


}
