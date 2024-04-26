package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.SeatStatus;
import com.hollywood.fptu_cinema.enums.TicketStatus;
import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Component
public class SchedulerService {

    private final TicketRepository ticketRepository;

    private final ScreeningRepository screeningRepository;

    private final SeatRepository seatRepository;

    private final BookingSeatRepository bookingSeatRepository;

    private final MovieRepository movieRepository;

    public SchedulerService(TicketRepository ticketRepository, ScreeningRepository screeningRepository, SeatRepository seatRepository, BookingSeatRepository bookingSeatRepository, MovieRepository movieRepository) {
        this.ticketRepository = ticketRepository;
        this.screeningRepository = screeningRepository;
        this.seatRepository = seatRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.movieRepository = movieRepository;
    }

    // Lập lịch hàm này để chạy mỗi phút một lần, hủy vé đã hết hạn
    @Transactional
    @Scheduled(fixedRate = 60000)
    public void cancelExpiredTicketsTask() {
        Instant now = Instant.now();
        List<Ticket> expiredTickets = ticketRepository.findTicketsByExpirationTimeBefore(now);
        for (Ticket ticket : expiredTickets) {
            if (ticket.getStatus() == TicketStatus.UNPAID) {
                ticket.setStatus(TicketStatus.CANCELLED);
                List<BookingSeat> bookedSeats = bookingSeatRepository.findByTicketId(ticket.getId());
                for (BookingSeat bookedSeat : bookedSeats) {
                    Seat seat = bookedSeat.getSeat();
                    seat.setStatus(SeatStatus.AVAILABLE);
                    seatRepository.save(seat);
                }
            }
        }
        if (!expiredTickets.isEmpty()) {
            ticketRepository.saveAll(expiredTickets);
        }
    }

    // Lập lịch hàm này để chạy vào đầu mỗi phút, đặt lại trạng thái ghế sau mỗi suất chiếu
    @Scheduled(cron = "0 * * * * *")
    public void resetSeatsAfterScreening() {
        List<Screening> finishedScreenings = screeningRepository.findFinishedScreenings(Instant.now());
        for (Screening screening : finishedScreenings) {
            List<Seat> seats = seatRepository.findByRoomId(screening.getRoom().getId());
            seats.forEach(seat -> {
                seat.setStatus(SeatStatus.AVAILABLE);
                seatRepository.save(seat);
            });
        }
    }

    // Lập lịch hàm này để chạy mỗi đêm nửa đêm, cập nhật trạng thái phim sau 1 tháng công chiếu
    @Scheduled(cron = "0 0 0 * * ?")
    public void updateMovieStatus() {
        List<Movie> movies = movieRepository.findAll();
        LocalDate oneMonthAgo = LocalDate.now().minusMonths(1);
        for (Movie movie : movies) {
            if (movie.getPremiere().isBefore(oneMonthAgo) && movie.getStatus() != 0) {
                movie.setStatus(0);
                movieRepository.save(movie);
            }
        }
    }
}
