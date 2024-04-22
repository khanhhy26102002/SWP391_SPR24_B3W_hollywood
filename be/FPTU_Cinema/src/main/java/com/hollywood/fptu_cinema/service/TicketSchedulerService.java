package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.SeatStatus;
import com.hollywood.fptu_cinema.enums.TicketStatus;
import com.hollywood.fptu_cinema.model.BookingSeat;
import com.hollywood.fptu_cinema.model.Screening;
import com.hollywood.fptu_cinema.model.Seat;
import com.hollywood.fptu_cinema.model.Ticket;
import com.hollywood.fptu_cinema.repository.BookingSeatRepository;
import com.hollywood.fptu_cinema.repository.ScreeningRepository;
import com.hollywood.fptu_cinema.repository.SeatRepository;
import com.hollywood.fptu_cinema.repository.TicketRepository;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
public class TicketSchedulerService {

    private final TicketRepository ticketRepository;

    private final ScreeningRepository screeningRepository;

    private final SeatRepository seatRepository;

    private final BookingSeatRepository bookingSeatRepository;

    public TicketSchedulerService(TicketRepository ticketRepository, ScreeningRepository screeningRepository, SeatRepository seatRepository, BookingSeatRepository bookingSeatRepository) {
        this.ticketRepository = ticketRepository;
        this.screeningRepository = screeningRepository;
        this.seatRepository = seatRepository;
        this.bookingSeatRepository = bookingSeatRepository;
    }

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
}
