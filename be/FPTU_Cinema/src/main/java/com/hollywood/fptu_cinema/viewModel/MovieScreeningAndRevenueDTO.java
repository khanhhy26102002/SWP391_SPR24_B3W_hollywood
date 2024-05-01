package com.hollywood.fptu_cinema.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class MovieScreeningAndRevenueDTO {
    private String movieName;
    private Long screeningCount;
    private BigDecimal totalRevenue;
}
