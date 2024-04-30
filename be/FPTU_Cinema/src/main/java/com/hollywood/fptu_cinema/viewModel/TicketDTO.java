package com.hollywood.fptu_cinema.viewModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hollywood.fptu_cinema.enums.TicketStatus;
import com.hollywood.fptu_cinema.model.User;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class TicketDTO {
    private Integer id;
    @Size(min = 1, message = "Image path cannot be empty.")
    private String imagePath;

    @Size(min = 1, message = "Movie name cannot be empty.")
    private String movieName;

    @Size(min = 1, message = "Rating cannot be empty.")
    private String rated;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    @Future(message = "Screening time must be in the future.")
    private LocalDateTime screeningTime;
    @Future(message = "Screening date must be in the future.")
    private Date screeningDate;
    @Size(min = 1, message = "Room number cannot be empty.")
    private String roomNumber;

    @NotNull(message = "Seat numbers cannot be null.")
    @Size(min = 1, message = "At least one seat must be selected.")
    private List<String> seatNumbers;

    @NotNull(message = "Total seats price cannot be null.")
    @Min(value = 0, message = "Total seats price cannot be negative.")
    private BigDecimal totalSeatsPrice;

    @NotNull(message = "Total combo price cannot be null.")
    @Min(value = 0, message = "Total combo price cannot be negative.")
    private BigDecimal totalComboPrice;

    @NotNull(message = "Total price cannot be null.")
    @Min(value = 0, message = "Total price cannot be negative.")
    private BigDecimal totalPrice;
    private TicketStatus status;
    private String userName;
}
