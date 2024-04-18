package com.hollywood.fptu_cinema.viewModel;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookingResponseDTO {
    private Integer ticketId;
    private BigDecimal totalPrice;
}
