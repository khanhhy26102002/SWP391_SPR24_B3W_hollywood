package com.hollywood.fptu_cinema.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DashboardData {
    private BigDecimal monthlyRevenue;
    private long totalUsers;
    private long ticketsSoldToday;
    private long totalMoviesThisMonth;
}
