package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.viewModel.DailyRevenueDTO;
import com.hollywood.fptu_cinema.viewModel.DashboardData;
import com.hollywood.fptu_cinema.viewModel.MovieScreeningAndRevenueDTO;
import com.hollywood.fptu_cinema.viewModel.MovieStatistics;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TicketRepository ticketRepository;

    private final UserRepository userRepository;

    private final MovieRepository movieRepository;

    private final PaymentRepository paymentRepository;

    private final ScreeningRepository screeningRepository;

    public DashboardService(TicketRepository ticketRepository, UserRepository userRepository, MovieRepository movieRepository, PaymentRepository paymentRepository, ScreeningRepository screeningRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.paymentRepository = paymentRepository;
        this.screeningRepository = screeningRepository;
    }

    public DashboardData getDashboardData() {
        LocalDate now = LocalDate.now();
        LocalDate firstDayOfMonth = now.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate firstDayOfNextMonth = now.with(TemporalAdjusters.firstDayOfNextMonth());

        Instant startOfTheMonth = firstDayOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant startOfNextMonth = firstDayOfNextMonth.atStartOfDay(ZoneId.systemDefault()).toInstant();

        BigDecimal monthlyRevenue = paymentRepository.calculateRevenueInDateRange(startOfTheMonth, startOfNextMonth);

        long totalUsers = userRepository.count();

        Instant startOfToday = now.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant startOfNextDay = now.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant();

        long ticketsSoldToday = ticketRepository.countByCreatedDateBetweenAndStatusIsSold(startOfToday, startOfNextDay);

        long totalMoviesThisMonth = movieRepository.countByPremiereBetween(firstDayOfMonth, firstDayOfNextMonth);

        return new DashboardData(monthlyRevenue, totalUsers, ticketsSoldToday, totalMoviesThisMonth);
    }

    public List<MovieStatistics> getTopMoviesBasedOnTicketsSold() {
        Pageable topFour = PageRequest.of(0, 4);
        return movieRepository.findTopMoviesByTicketsSold(topFour);
    }

    public List<DailyRevenueDTO> getMonthlyRevenueData() {
        List<Map<String, Object>> revenueData = paymentRepository.calculateCurrentMonthRevenue();
        return revenueData.stream().map(record -> {
            java.sql.Date paymentDateSql = (java.sql.Date) record.get("paymentDay");
            LocalDate paymentDate = paymentDateSql.toLocalDate();
            BigDecimal dailyRevenue = (BigDecimal) record.get("dailyRevenue");
            return new DailyRevenueDTO(paymentDate, dailyRevenue);
        }).collect(Collectors.toList());
    }

    public List<MovieScreeningAndRevenueDTO> getWeeklyMovieScreeningAndRevenue() {
        LocalDate startDate = LocalDate.now().with(DayOfWeek.MONDAY);
        LocalDate endDate = startDate.plusDays(6);

        List<Object[]> results = screeningRepository.findMovieScreeningAndRevenueForWeek(startDate, endDate);

        return results.stream().map(result -> {
            Integer movieId = (Integer) result[0];
            Long screeningCount = (Long) result[1];
            BigDecimal totalRevenue = (BigDecimal) result[2];
            // Tìm thông tin phim dựa trên movieId để lấy tên phim
            Optional<Movie> movie = movieRepository.findById(movieId);
            String movieName = movie.map(Movie::getName).orElse("Unknown");
            return new MovieScreeningAndRevenueDTO(movieName, screeningCount, totalRevenue);
        }).collect(Collectors.toList());
    }
}
