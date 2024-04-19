package com.hollywood.fptu_cinema.viewModel;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
public class TicketDTO {
    private String movieName;
    private LocalDateTime screeningTime;
    private Date screeningDate;
    private String roomNumber;
    private List<String> seatNumbers;
    private BigDecimal totalSeatsPrice;
    private BigDecimal totalComboPrice;
    private BigDecimal totalPrice;

}
