package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.service.TicketService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.BookingRequestDTO;
import com.hollywood.fptu_cinema.viewModel.BookingResponseDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import com.hollywood.fptu_cinema.viewModel.TicketDTO;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/ticket")
public class TicketController {

    private static final Logger logger = LogManager.getLogger(TicketController.class);
    private final TicketService ticketService;
    private final UserService userService;

    public TicketController(TicketService ticketService, UserService userService) {
        this.ticketService = ticketService;
        this.userService = userService;
    }

    @Operation(summary = "Create Booking")
    @PostMapping("/createBooking")
    @Secured({"MEMBER"})
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequestDTO bookingRequest) {
        try {
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            Integer userId = Integer.parseInt(userIdString);
            User currentUser = userService.findUserById(userId);
            BookingResponseDTO response = ticketService.createBooking(bookingRequest, currentUser);

            logger.info("Ticket created successfully for user: {}", currentUser.getUserName());
            return Response.success(response);
        } catch (Exception e) {
            logger.error("Error creating ticket for user: {}. Error: {}", Util.currentUser(), e.getMessage(), e);
            return Response.error(e);
        }
    }

    @Operation(summary = "Ticket Information")
    @Secured({"MEMBER"})
    @GetMapping("/getTicketInformation/{ticketId}")
    public ResponseEntity<?> getTicketInformation(@PathVariable int ticketId) {
        try {
            TicketDTO ticketInfo = ticketService.getTicketDetails(ticketId);
            logger.info("Retrieved ticket information successfully for ticket ID: {}", ticketId);
            return Response.success(ticketInfo);
        } catch (Exception e) {
            logger.error("Error retrieving ticket information for ticket ID: {}. Error: {}", ticketId, e.getMessage(), e);
            return Response.error(e);
        }
    }

    @Operation(summary = "List Ticket")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    @GetMapping("/listTicket")
    public ResponseEntity<?> listTicket() {
        try {
            List<TicketDTO> ticket = ticketService.getAllTickets();
            logger.info("Retrieved all tickets successfully for user: {}", Util.currentUser());
            return Response.success(ticket);
        } catch (Exception e) {
            logger.error("Error retrieving all tickets. Error: {}", e.getMessage(), e);
            return Response.error(e);
        }
    }

    @Operation(summary = "Cancel Ticket")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    @PostMapping("/cancel/{ticketId}")
    public ResponseEntity<?> cancelTicket(@PathVariable int ticketId) {
        try {
            ticketService.cancelTicket(ticketId);
            logger.info("Ticket cancelled successfully for ticket ID: {}", ticketId);
            return Response.success("Ticket cancelled successfully for ticket ID: " + ticketId);
        } catch (Exception e) {
            logger.error("Error cancelling ticket for ticket ID: {}. Error: {}", ticketId, e.getMessage(), e);
            return Response.error(e);
        }
    }
}
