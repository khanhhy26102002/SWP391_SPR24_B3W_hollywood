package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.viewModel.BookingRequestDTO;
import com.hollywood.fptu_cinema.viewModel.BookingResponseDTO;
import com.hollywood.fptu_cinema.viewModel.TicketDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.util.List;
import java.util.NoSuchElementException;
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
        Screening screening = screeningRepository.findById(bookingRequest.getScreeningId())
                .orElseThrow(() -> new NoSuchElementException("Screening not found with ID: " + bookingRequest.getScreeningId()));
        Instant currentTime = Instant.now();
        Instant screeningStartTime = screening.getStartTime();
        if (currentTime.isAfter(screeningStartTime.minus(Duration.ofHours(1)))) {
            throw new IllegalStateException("Cannot create booking within 1 hour before screening start time.");
        }
        if (bookingRequest.getSeatNumbers() == null || bookingRequest.getSeatNumbers().isEmpty()) {
            throw new IllegalStateException("Seats must be selected before selecting combos.");
        }

        Ticket ticket = createNewTicket(user, screening);
        BigDecimal totalSeatsPrice = calculateTotalSeatsPrice(bookingRequest, ticket, screening);
        BigDecimal totalComboPrice = calculateTotalComboPrice(bookingRequest);
        saveSelectedCombos(bookingRequest, ticket);

        ticket.setTotalPrice(totalSeatsPrice.add(totalComboPrice));
        ticket = ticketRepository.save(ticket);

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
        return bookingRequest.getSeatNumbers().stream()
                .map(seatNumberDTO -> seatRepository.findBySeatNumber(seatNumberDTO.getSeatNumber())
                        .filter(seat -> !bookingSeatRepository.isSeatBooked(seat.getId(), screening.getId()))
                        .map(seat -> {
                            BigDecimal seatPrice = seat.getSeatPrice();
                            BookingSeat bookingSeat = new BookingSeat();
                            bookingSeat.setTicket(ticket);
                            bookingSeat.setSeat(seat);
                            bookingSeat.setTotal(seatPrice);
                            bookingSeatRepository.save(bookingSeat);
                            return seatPrice;
                        })
                        .orElseThrow(() -> new IllegalArgumentException("Seat not found or already booked with number: " + seatNumberDTO.getSeatNumber())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateTotalComboPrice(BookingRequestDTO bookingRequest) {
        return bookingRequest.getComboQuantities().entrySet().stream()
                .filter(entry -> entry.getValue() > 0)
                .map(entry -> comboRepository.findById(entry.getKey())
                        .map(combo -> combo.getComboPrice().multiply(BigDecimal.valueOf(entry.getValue())))
                        .orElse(BigDecimal.ZERO))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void saveSelectedCombos(BookingRequestDTO bookingRequest, Ticket ticket) {
        bookingRequest.getComboQuantities().entrySet().stream()
                .filter(entry -> entry.getValue() > 0)
                .forEach(entry -> {
                    Combo combo = comboRepository.findById(entry.getKey())
                            .orElseThrow(() -> new NoSuchElementException("Combo not found with ID: " + entry.getKey()));
                    BigDecimal totalAmount = combo.getComboPrice().multiply(BigDecimal.valueOf(entry.getValue()));
                    BookingCombo bookingCombo = new BookingCombo();
                    bookingCombo.setTicket(ticket);
                    bookingCombo.setCombo(combo);
                    bookingCombo.setQuantity(entry.getValue());
                    bookingCombo.setTotalAmount(totalAmount);
                    bookingComboRepository.save(bookingCombo);
                });
    }

    private BookingResponseDTO createBookingResponse(Ticket ticket, BigDecimal totalSeatsPrice, BigDecimal totalComboPrice) {
        BookingResponseDTO response = new BookingResponseDTO();
        response.setTicketId(ticket.getId());
        response.setTotalPrice(totalSeatsPrice.add(totalComboPrice));
        return response;
    }
}