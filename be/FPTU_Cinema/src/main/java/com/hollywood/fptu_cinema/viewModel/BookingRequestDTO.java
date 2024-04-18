package com.hollywood.fptu_cinema.viewModel;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class BookingRequestDTO {
    private Integer screeningId;
    private List<SeatQuantityDTO> seatsQuantities;
    private Map<Integer, Integer> comboQuantities;
}
