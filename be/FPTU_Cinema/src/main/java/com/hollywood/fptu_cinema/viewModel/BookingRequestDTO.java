package com.hollywood.fptu_cinema.viewModel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
public class BookingRequestDTO {
    @NotNull(message = "Screening date cannot be null")
    private LocalDate screeningDate;

    @NotNull(message = "Screening time cannot be null")
    private String screeningTime;

    private List< SeatNumberDTO> seatNumbers;

    private Map<Integer, Integer> comboQuantities;
}
