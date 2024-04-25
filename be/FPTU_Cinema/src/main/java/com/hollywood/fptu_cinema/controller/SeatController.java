package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.Seat;
import com.hollywood.fptu_cinema.service.SeatService;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/seat")
public class SeatController {
    private static final Logger logger = LogManager.getLogger(SeatController.class);
    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @Operation(summary = "Get List Seat")
    @GetMapping("/getLists")
    public ResponseEntity<?> getSeats() {
        try {
            List<Seat> seat = seatService.listSeats();
            if (seat.isEmpty()) {
                return Response.error(new Exception("No saat found"));
            }
            return Response.success(seat);
        } catch (Exception e) {
            logger.error("An error occurred while listing seats: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
