package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.repository.TicketRepository;
import com.hollywood.fptu_cinema.repository.UserRepository;
import com.hollywood.fptu_cinema.viewModel.DashboardData;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;

@Service
public class DashboardService {

    private final TicketRepository ticketRepository;

    private final UserRepository userRepository;

    private final MovieRepository movieRepository;

    public DashboardService(TicketRepository ticketRepository, UserRepository userRepository, MovieRepository movieRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    public DashboardData getDashboardData() {
        LocalDate now = LocalDate.now();
        LocalDate firstDayOfMonth = now.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate firstDayOfNextMonth = now.with(TemporalAdjusters.firstDayOfNextMonth());

        Instant startOfTheMonth = firstDayOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant startOfNextMonth = firstDayOfNextMonth.atStartOfDay(ZoneId.systemDefault()).toInstant();

        BigDecimal monthlyRevenue = ticketRepository.calculateRevenueInDateRange(startOfTheMonth, startOfNextMonth);

        long totalUsers = userRepository.count();

        Instant startOfToday = now.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant startOfNextDay = now.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant();

        long ticketsSoldToday = ticketRepository.countByCreatedDateBetween(startOfToday, startOfNextDay);

        long totalMoviesThisMonth = movieRepository.countByPremiereBetween(firstDayOfMonth, firstDayOfNextMonth);

        return new DashboardData(monthlyRevenue, totalUsers, ticketsSoldToday, totalMoviesThisMonth);
    }
}
