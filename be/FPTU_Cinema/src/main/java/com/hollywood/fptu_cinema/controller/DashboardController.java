package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.DashboardService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.*;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private static final Logger logger = LogManager.getLogger(DashboardController.class);

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @Operation(summary = "Dashboard")
    @Secured({"ADMIN"})
    @GetMapping("/getReport")
    public ResponseEntity<?> getReport() {
        try {
            DashboardData data = dashboardService.getDashboardData();
            logger.info("Retrieved all data successfully for user: {}", Util.currentUser());
            return Response.success(data);
        } catch (Exception e) {
            logger.info("Failed to get all data for user: {}", Util.currentUser());
            return Response.error(e);
        }
    }

    @Operation(summary = "Top Movies")
    @Secured({"ADMIN"})
    @GetMapping("/getTopMovies")
    public ResponseEntity<?> getTopMovies() {
        try {
            List<MovieStatistics> movies = dashboardService.getTopMoviesBasedOnTicketsSold();
            if (movies.isEmpty()) {
                return Response.error(new Exception("No movies found"));
            }
            return Response.success(movies);
        } catch (Exception e) {
            logger.error("An error occurred while listing movies: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Monthly Revenue")
    @Secured({"ADMIN"})
    @GetMapping("/getMonthlyRevenue")
    public ResponseEntity<?> getMonthlyRevenue() {
        try {
            List<DailyRevenueDTO> revenueData = dashboardService.getMonthlyRevenueData();
            logger.info("Retrieved monthly revenue data successfully");
            return Response.success(revenueData);
        } catch (Exception e) {
            logger.error("Failed to get monthly revenue data: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Weekly Movie Stats")
    @Secured({"ADMIN"})
    @GetMapping("/getWeeklyMovieStats")
    public ResponseEntity<?> getWeeklyMovieStats() {
        try {
            List<MovieScreeningAndRevenueDTO> movieStats = dashboardService.getWeeklyMovieScreeningAndRevenue();
            logger.info("Retrieved weekly movie stats successfully");
            return Response.success(movieStats);
        } catch (Exception e) {
            logger.error("Failed to get weekly movie stats: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
