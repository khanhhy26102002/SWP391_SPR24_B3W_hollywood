package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.PaymentService;
import com.hollywood.fptu_cinema.viewModel.PaymentInfoDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private static final Logger logger = LogManager.getLogger(PaymentController.class);
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @Operation(summary = "Payment Information")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    @GetMapping("/getPaymentInfo/{ticketId}")
    public ResponseEntity<?> getPaymentInfo(@PathVariable int ticketId) {
        try {
            PaymentInfoDTO paymentInfo = paymentService.preparePaymentInfo(ticketId);
            logger.info("Retrieved payment information successfully for ticket ID: {}", ticketId);
            return Response.success(paymentInfo);
        } catch (Exception e) {
            logger.error("Error retrieving payment information for ticket ID: {}. Error: {}", ticketId, e.getMessage(), e);
            return Response.error(e);
        }
    }

    @Operation(summary = "Process Payment")
    @Secured({"MEMBER"})
    @PostMapping("/processPayment/{ticket}")
    public ResponseEntity<?> processPayment(@PathVariable int ticket, @RequestBody String paymentMethod) {
        try {
            paymentService.processPayment(ticket, paymentMethod);
            logger.info("Processed payment successfully for ticket ID: {}", ticket);
            return Response.success("Processed payment successfully for ticket ID: " + ticket);
        } catch (Exception e) {
            logger.error("Error processing payment for ticket ID: {}", ticket);
            return Response.error(e);
        }
    }

    @Operation(summary = "List Payment")
    @Secured({"ADMIN", "STAFF", "MEMBER"})
    @PostMapping("/listPayment")
    public ResponseEntity<?> listPayment() {
        try {
            List<PaymentInfoDTO> listPayment = paymentService.getAllPaymentInfoDTOs();
            return Response.success(listPayment);
        } catch (Exception e) {
            logger.error("An error occurred while listing payment: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
