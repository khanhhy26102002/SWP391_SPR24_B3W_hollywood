package com.hollywood.fptu_cinema.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentInfoDTO {
    private String imagePath;
    private String movieName;
    private String rated;
    private LocalDateTime screeningDateTime;
    private String roomNumber;
    private List<String> seatNumbers;
    private BigDecimal totalSeatsPrice;
    private BigDecimal totalComboPrice;
    private BigDecimal totalAmount;
    private LocalDateTime expirationTime;
    private String paymentMethod;

}
