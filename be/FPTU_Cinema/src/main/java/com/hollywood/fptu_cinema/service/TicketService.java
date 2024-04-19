package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.viewModel.BookingRequestDTO;
import com.hollywood.fptu_cinema.viewModel.BookingResponseDTO;
import com.hollywood.fptu_cinema.viewModel.SeatNumberDTO;
import com.hollywood.fptu_cinema.viewModel.TicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final SeatRepository seatRepository;
    private final ScreeningRepository screeningRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final BookingComboRepository bookingComboRepository;
    private final ComboRepository comboRepository;
    private final ImageRepository imageRepository;

    public TicketService(TicketRepository ticketRepository, SeatRepository seatRepository, ScreeningRepository screeningRepository, BookingSeatRepository bookingSeatRepository, BookingComboRepository bookingComboRepository, ComboRepository comboRepository, ImageRepository imageRepository) {
        this.ticketRepository = ticketRepository;
        this.seatRepository = seatRepository;
        this.screeningRepository = screeningRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.bookingComboRepository = bookingComboRepository;
        this.comboRepository = comboRepository;
        this.imageRepository = imageRepository;
    }

    public TicketDTO getTicketDetails(int ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found with ID: " + ticketId));

        List<BookingSeat> bookingSeats = bookingSeatRepository.findByTicketId(ticketId);
        BigDecimal totalSeatsPrice = bookingSeats.stream()
                .map(BookingSeat::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<BookingCombo> bookingCombos = bookingComboRepository.findByTicketId(ticketId);
        BigDecimal totalComboPrice = bookingCombos.stream()
                .map(BookingCombo::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Screening screening = ticket.getScreening();
        Movie movie = screening.getMovie();
        Room room = screening.getRoom();

        String imagePath = imageRepository.findByMovieId(movie.getId())
                .stream()
                .findFirst()
                .map(Image::getPath)
                .orElse(null);

        List<String> seatNumbers = bookingSeats.stream()
                .map(bookingSeat -> bookingSeat.getSeat().getSeatNumber())
                .collect(Collectors.toList());

        return new TicketDTO(
                imagePath,
                movie.getName(),
                movie.getRated(),
                screening.getStartTime().atZone(ZoneId.systemDefault()).toLocalDateTime(),
                Date.valueOf(screening.getDate()),
                room.getRoomNumber(),
                seatNumbers,
                totalSeatsPrice,
                totalComboPrice,
                totalSeatsPrice.add(totalComboPrice)
        );
    }

    public BookingResponseDTO createBooking(BookingRequestDTO bookingRequest, User user) {
        // Find the screening
        Screening screening = screeningRepository.findById(bookingRequest.getScreeningId())
                .orElseThrow(() -> new NoSuchElementException("Screening not found with ID: " + bookingRequest.getScreeningId()));

        // Ensure that seats are selected after screening is chosen and before combos
        if (bookingRequest.getSeatNumbers() == null || bookingRequest.getSeatNumbers().isEmpty()) {
            throw new IllegalStateException("Seats must be selected before selecting combos.");
        }

        // Create a new ticket for the user and screening
        Ticket ticket = createNewTicket(user, screening);

        // Calculate total price for the selected seats
        BigDecimal totalSeatsPrice = calculateTotalSeatsPrice(bookingRequest, ticket, screening);

        // At this point, seat selection is mandatory and completed, now proceed to combos
        BigDecimal totalComboPrice = BigDecimal.ZERO;
        if (bookingRequest.getComboQuantities() != null && !bookingRequest.getComboQuantities().isEmpty()) {
            totalComboPrice = calculateTotalComboPrice(bookingRequest);
        }

        // Save selected combos information if any combo is selected
        saveSelectedCombos(bookingRequest, ticket);

        // Set total price for the ticket (seats + combos) and save the ticket
        ticket.setTotalPrice(totalSeatsPrice.add(totalComboPrice));
        ticket = ticketRepository.save(ticket);

        // Create and return the booking response
        return createBookingResponse(ticket, totalSeatsPrice, totalComboPrice);
    }

    private Ticket createNewTicket(User user, Screening screening) {
        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setScreening(screening);
        ticket.setCreatedDate(Instant.now());
        ticket.setExpirationTime(Instant.now().plus(Duration.ofMinutes(15)));
        ticket.setStatus(1); // 1 = Chưa thanh toán
        return ticket;
    }

    private BigDecimal calculateTotalSeatsPrice(BookingRequestDTO bookingRequest, Ticket ticket, Screening screening) {
        BigDecimal totalSeatsPrice = BigDecimal.ZERO;
        for (SeatNumberDTO seatNumberDTO : bookingRequest.getSeatNumbers()) {
            String seatNumber = seatNumberDTO.getSeatNumber();
            Seat seat = seatRepository.findBySeatNumber(seatNumber);
            if (seat == null) {
                throw new IllegalArgumentException("Seat not found with number: " + seatNumber);
            }
            // Check if the seat is already booked for this screening
            if (bookingSeatRepository.isSeatBooked(seat.getId(), screening.getId())) {
                throw new IllegalStateException("Seat with number: " + seatNumber + " is already booked for this screening.");
            }
            totalSeatsPrice = totalSeatsPrice.add(seat.getSeatPrice());
            BookingSeat bookingSeat = new BookingSeat();
            bookingSeat.setTicket(ticket);
            bookingSeat.setSeat(seat);
            bookingSeat.setTotal(seat.getSeatPrice());
            bookingSeatRepository.save(bookingSeat);
        }
        return totalSeatsPrice;
    }

    private BigDecimal calculateTotalComboPrice(BookingRequestDTO bookingRequest) {
        BigDecimal totalComboPrice = BigDecimal.ZERO;
        for (Map.Entry<Integer, Integer> entry : bookingRequest.getComboQuantities().entrySet()) {
            Combo combo = comboRepository.findById(entry.getKey()).orElseThrow(
                    () -> new NoSuchElementException("Combo not found with ID: " + entry.getKey())
            );
            totalComboPrice = totalComboPrice.add(combo.getComboPrice().multiply(new BigDecimal(entry.getValue())));
        }
        return totalComboPrice;
    }

    private void saveSelectedCombos(BookingRequestDTO bookingRequest, Ticket ticket) {
        for (Map.Entry<Integer, Integer> entry : bookingRequest.getComboQuantities().entrySet()) {
            if (entry.getValue() > 0) {
                Combo combo = comboRepository.findById(entry.getKey())
                        .orElseThrow(() -> new NoSuchElementException("Combo not found with ID: " + entry.getKey()));
                BigDecimal totalAmount = combo.getComboPrice().multiply(new BigDecimal(entry.getValue()));
                BookingCombo bookingCombo = new BookingCombo();
                bookingCombo.setTicket(ticket);
                bookingCombo.setCombo(combo);
                bookingCombo.setQuantity(entry.getValue());
                bookingCombo.setTotalAmount(totalAmount);
                bookingComboRepository.save(bookingCombo);
            }
        }
    }

    private BookingResponseDTO createBookingResponse(Ticket ticket, BigDecimal totalSeatsPrice, BigDecimal totalComboPrice) {
        BookingResponseDTO response = new BookingResponseDTO();
        response.setTicketId(ticket.getId());
        response.setTotalPrice(totalSeatsPrice.add(totalComboPrice));
        return response;
    }
}
