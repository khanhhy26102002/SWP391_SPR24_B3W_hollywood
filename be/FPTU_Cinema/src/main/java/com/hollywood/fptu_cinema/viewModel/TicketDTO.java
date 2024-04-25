package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.enums.TicketStatus;
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
    private String imagePath;
    private String movieName;
    private String rated;
    private LocalDateTime screeningTime;
    private Date screeningDate;
    private String roomNumber;
    private List<String> seatNumbers;
    private BigDecimal totalSeatsPrice;
    private BigDecimal totalComboPrice;
    private BigDecimal totalPrice;
    private TicketStatus status;
}
