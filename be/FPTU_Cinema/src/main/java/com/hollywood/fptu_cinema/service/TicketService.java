package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.SeatStatus;
import com.hollywood.fptu_cinema.enums.TicketStatus;
import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.viewModel.BookingRequestDTO;
import com.hollywood.fptu_cinema.viewModel.BookingResponseDTO;
import com.hollywood.fptu_cinema.viewModel.TicketDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Function;
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
        Ticket ticket = findTicketById(ticketId);
        Screening screening = ticket.getScreening();
        Movie movie = screening.getMovie();
        Room room = screening.getRoom();

        String imagePath = findImagePathByMovieId(movie.getId());
        List<String> seatNumbers = getSeatNumbersByTicketId(ticketId);
        BigDecimal totalSeatsPrice = calculateTotalPrice(bookingSeatRepository.findByTicketId(ticketId), BookingSeat::getTotal);
        BigDecimal totalComboPrice = calculateTotalPrice(bookingComboRepository.findByTicketId(ticketId), BookingCombo::getTotalAmount);

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
        LocalDate date = bookingRequest.getScreeningDate();
        LocalTime time = LocalTime.parse(bookingRequest.getScreeningTime());

        if (date == null) {
            throw new IllegalArgumentException("A screening date and time must be selected.");
        }
        ZoneId zoneId = ZoneId.of("UTC");

        Instant screeningStartInstant = LocalDateTime.of(date, time).atZone(zoneId).toInstant();

        Screening screening = screeningRepository.findByDateAndStartTime(date, screeningStartInstant)
                .orElseThrow(() -> new NoSuchElementException("No screening found for the selected date and time"));

        Instant currentTime = Instant.now();
        Instant screeningStartTime = screening.getStartTime();
        if (currentTime.isAfter(screeningStartTime.minus(Duration.ofHours(1)))) {
            throw new IllegalStateException("Cannot create booking within 1 hour before screening start time.");
        }
        if (bookingRequest.getSeatNumbers() == null || bookingRequest.getSeatNumbers().isEmpty()) {
            throw new IllegalStateException("Seats must be selected before selecting combos.");
        }
        Ticket ticket = createNewTicket(user, screening);

        List<BookingSeat> bookingSeats = processBookingSeats(bookingRequest, ticket, screening);
        BigDecimal totalSeatsPrice = calculateTotalPrice(bookingSeats, BookingSeat::getTotal);

        List<BookingCombo> bookingCombos = processBookingCombos(bookingRequest, ticket);
        BigDecimal totalComboPrice = calculateTotalPrice(bookingCombos, BookingCombo::getTotalAmount);

        if (currentTime.isAfter(ticket.getExpirationTime())) {
            throw new IllegalStateException("Booking time has expired. Please try again.");
        }

        BigDecimal totalPrice = totalSeatsPrice.add(totalComboPrice);
        ticket.setTotalPrice(totalPrice);
        ticketRepository.save(ticket);

        return createBookingResponse(ticket, totalSeatsPrice, totalComboPrice);
    }



    private Ticket createNewTicket(User user, Screening screening) {
        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setScreening(screening);
        ticket.setExpirationTime(Instant.now().plus(Duration.ofMinutes(15)));
        ticket.setStatus(TicketStatus.UNPAID);
        return ticket;
    }

    private List<BookingSeat> processBookingSeats(BookingRequestDTO bookingRequest, Ticket ticket, Screening screening) {
        return bookingRequest.getSeatNumbers().stream()
                .map(seatNumberDTO -> seatRepository.findBySeatNumber(seatNumberDTO.getSeatNumber())
                        .filter(seat -> !bookingSeatRepository.isSeatBooked(seat.getId(), screening.getId()))
                        .map(seat -> {
                            seat.setStatus(SeatStatus.UNAVAILABLE);
                            seatRepository.save(seat);

                            BookingSeat bookingSeat = new BookingSeat();
                            bookingSeat.setTicket(ticket);
                            bookingSeat.setSeat(seat);
                            bookingSeat.setTotal(seat.getSeatPrice());
                            bookingSeatRepository.save(bookingSeat);
                            return bookingSeat;
                        })
                        .orElseThrow(() -> new IllegalArgumentException("Seat not found or already booked with number: " + seatNumberDTO.getSeatNumber())))
                .collect(Collectors.toList());
    }

    private List<BookingCombo> processBookingCombos(BookingRequestDTO bookingRequest, Ticket ticket) {
        return bookingRequest.getComboQuantities().entrySet().stream()
                .filter(entry -> entry.getValue() > 0)
                .map(entry -> {
                    Combo combo = comboRepository.findById(entry.getKey())
                            .orElseThrow(() -> new NoSuchElementException("Combo not found with ID: " + entry.getKey()));

                    BookingCombo bookingCombo = new BookingCombo();
                    bookingCombo.setTicket(ticket);
                    bookingCombo.setCombo(combo);
                    bookingCombo.setQuantity(entry.getValue());
                    bookingCombo.setTotalAmount(combo.getComboPrice().multiply(BigDecimal.valueOf(entry.getValue())));
                    bookingComboRepository.save(bookingCombo);
                    return bookingCombo;
                })
                .collect(Collectors.toList());
    }

    private Ticket findTicketById(int ticketId) {
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found with ID: " + ticketId));
    }

    private String findImagePathByMovieId(int movieId) {
        return imageRepository.findByMovieId(movieId)
                .stream()
                .findFirst()
                .map(Image::getPath)
                .orElse(null);
    }

    private List<String> getSeatNumbersByTicketId(int ticketId) {
        return bookingSeatRepository.findByTicketId(ticketId).stream()
                .map(bookingSeat -> bookingSeat.getSeat().getSeatNumber())
                .collect(Collectors.toList());
    }

    private <T> BigDecimal calculateTotalPrice(List<T> items, Function<T, BigDecimal> totalExtractor) {
        return items.stream()
                .map(totalExtractor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }



    private BookingResponseDTO createBookingResponse(Ticket ticket, BigDecimal totalSeatsPrice, BigDecimal totalComboPrice) {
        BookingResponseDTO response = new BookingResponseDTO();
        response.setTicketId(ticket.getId());
        response.setTotalPrice(totalSeatsPrice.add(totalComboPrice));
        return response;
    }
}