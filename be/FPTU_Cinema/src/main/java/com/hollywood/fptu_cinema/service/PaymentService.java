package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.BookingComboRepository;
import com.hollywood.fptu_cinema.repository.BookingSeatRepository;
import com.hollywood.fptu_cinema.repository.ImageRepository;
import com.hollywood.fptu_cinema.repository.TicketRepository;
import com.hollywood.fptu_cinema.viewModel.PaymentInfoDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final TicketRepository ticketRepository;

    private final BookingSeatRepository bookingSeatRepository;

    private final ImageRepository imageRepository;

    private final BookingComboRepository bookingComboRepository;

    public PaymentService(ImageRepository imageRepository, TicketRepository ticketRepository, BookingSeatRepository bookingSeatRepository, BookingComboRepository bookingComboRepository) {
        this.imageRepository = imageRepository;
        this.ticketRepository = ticketRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.bookingComboRepository = bookingComboRepository;
    }

    public PaymentInfoDTO preparePaymentInfo(int ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found with ID: " + ticketId));

        Screening screening = ticket.getScreening();
        Movie movie = screening.getMovie();
        Room room = screening.getRoom();

        List<BookingSeat> bookingSeats = bookingSeatRepository.findByTicketId(ticketId);
        List<String> seatNumbers = bookingSeats.stream()
                .map(bs -> bs.getSeat().getSeatNumber())
                .collect(Collectors.toList());

        BigDecimal totalSeatsPrice = calculateTotalPriceForSeats(bookingSeats);

        List<BookingCombo> bookingCombos = bookingComboRepository.findByTicketId(ticketId);
        BigDecimal totalComboPrice = calculateTotalPriceForCombos(bookingCombos);

        String imagePath = imageRepository.findByMovieId(movie.getId()).stream()
                .findFirst()
                .map(Image::getPath)
                .orElse(null);

        ZoneId defaultZoneId = ZoneId.systemDefault();
        LocalDateTime startTime = screening.getStartTime().atZone(defaultZoneId).toLocalDateTime();
        LocalDateTime expirationTime = ticket.getExpirationTime().atZone(defaultZoneId).toLocalDateTime();

        return new PaymentInfoDTO(
                movie.getName(),
                imagePath,
                movie.getRated(),
                startTime,
                room.getRoomNumber(),
                seatNumbers,
                totalSeatsPrice,
                totalComboPrice,
                totalSeatsPrice.add(totalComboPrice),
                expirationTime,
                "e-wallet"
        );
    }

    private BigDecimal calculateTotalPriceForSeats(List<BookingSeat> bookingSeats) {
        return bookingSeats.stream()
                .map(BookingSeat::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateTotalPriceForCombos(List<BookingCombo> bookingCombos) {
        return bookingCombos.stream()
                .map(BookingCombo::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
