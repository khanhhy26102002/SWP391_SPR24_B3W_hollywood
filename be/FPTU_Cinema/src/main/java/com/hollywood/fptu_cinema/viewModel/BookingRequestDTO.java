package com.hollywood.fptu_cinema.viewModel;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
public class BookingRequestDTO {
    private LocalDate screeningDate;
    private String screeningTime;
    private List<SeatNumberDTO> seatNumbers;
    private Map<Integer, Integer> comboQuantities;
}
