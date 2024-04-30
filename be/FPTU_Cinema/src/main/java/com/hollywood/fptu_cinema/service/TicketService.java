package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.PaymentStatus;
import com.hollywood.fptu_cinema.enums.RoomStatus;
import com.hollywood.fptu_cinema.enums.SeatStatus;
import com.hollywood.fptu_cinema.enums.TicketStatus;
import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.viewModel.BookingRequestDTO;
import com.hollywood.fptu_cinema.viewModel.BookingResponseDTO;
import com.hollywood.fptu_cinema.viewModel.TicketDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final SeatRepository seatRepository;
    private final ScreeningRepository screeningRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final BookingComboRepository bookingComboRepository;
    private final ImageRepository imageRepository;
    private final QRCodeService qrCodeService;
    private final PaymentRepository paymentRepository;
    private final RoomRepository roomRepository;
    private final ScreeningSeatPriceRepository screeningSeatPriceRepository;
    private final ScreeningComboPriceRepository screeningComboPriceRepository;

    public TicketService(TicketRepository ticketRepository,
                         SeatRepository seatRepository,
                         ScreeningRepository screeningRepository,
                         BookingSeatRepository bookingSeatRepository,
                         BookingComboRepository bookingComboRepository,
                         ImageRepository imageRepository,
                         QRCodeService qrCodeService, PaymentRepository paymentRepository, RoomRepository roomRepository, ScreeningSeatPriceRepository screeningSeatPriceRepository, ScreeningComboPriceRepository screeningComboPriceRepository) {
        this.ticketRepository = ticketRepository;
        this.seatRepository = seatRepository;
        this.screeningRepository = screeningRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.bookingComboRepository = bookingComboRepository;
        this.imageRepository = imageRepository;
        this.qrCodeService = qrCodeService;
        this.paymentRepository = paymentRepository;
        this.roomRepository = roomRepository;
        this.screeningSeatPriceRepository = screeningSeatPriceRepository;
        this.screeningComboPriceRepository = screeningComboPriceRepository;
    }

    public TicketDTO getTicketDetails(int ticketId) {
        Ticket ticket = findTicketById(ticketId);
        return convertToTicketDTO(ticket);
    }

    public List<TicketDTO> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();
        return tickets.stream().map(this::convertToTicketDTO).collect(Collectors.toList());
    }

    @Transactional
    public BookingResponseDTO createBooking(BookingRequestDTO bookingRequest, User user) throws Exception {
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
        ticketRepository.save(ticket);

        List<BookingSeat> bookingSeats = processBookingSeats(bookingRequest, screening);
        BigDecimal totalSeatsPrice = calculateTotalPrice(bookingSeats, BookingSeat::getTotalPrice);

        List<BookingCombo> bookingCombos = processBookingCombos(bookingRequest, screening);
        BigDecimal totalComboPrice = calculateTotalPrice(bookingCombos, BookingCombo::getTotalPrice);

        bookingSeats.forEach(bookingSeat -> {
            bookingSeat.getSeat().setStatus(SeatStatus.UNAVAILABLE);
            bookingSeat.setTicket(ticket);
        });

        bookingCombos.forEach(bookingCombo -> bookingCombo.setTicket(ticket));

        bookingSeatRepository.saveAll(bookingSeats);
        bookingComboRepository.saveAll(bookingCombos);

        updateRoomStatusAfterBooking(screening.getRoom().getId());

        if (currentTime.isAfter(ticket.getExpirationTime())) {
            throw new IllegalStateException("Booking time has expired. Please try again.");
        }

        BigDecimal totalPrice = totalSeatsPrice.add(totalComboPrice);
        ticket.setTotalPrice(totalPrice);
        ticket.setQrCode(generateQRCode(ticket));
        ticketRepository.save(ticket);
        seatRepository.saveAll(bookingSeats.stream()
                .map(BookingSeat::getSeat)
                .collect(Collectors.toList()));

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

    private List<BookingSeat> processBookingSeats(BookingRequestDTO bookingRequest, Screening screening) {
        return bookingRequest.getSeatNumbers().stream()
                .map(seatNumberDTO -> {
                    Seat seat = seatRepository.findBySeatNumberAndRoomId(seatNumberDTO.getSeatNumber(), screening.getRoom().getId())
                            .orElseThrow(() -> new IllegalArgumentException("Seat not found or already booked with number: " + seatNumberDTO.getSeatNumber()));
                    ScreeningSeatPrice screeningSeatPrice = screeningSeatPriceRepository.findByScreeningIdAndSeatTypeId(
                                    screening.getId(), seat.getSeatType().getId())
                            .orElseThrow(() -> new NoSuchElementException("Screening seat price not found for seat type: " + seat.getSeatType().getName()));
                    BookingSeat bookingSeat = new BookingSeat();
                    bookingSeat.setSeat(seat);
                    bookingSeat.setScreeningSeatPrice(screeningSeatPrice);
                    bookingSeat.setTotalPrice(screeningSeatPrice.getPrice());
                    return bookingSeat;
                })
                .collect(Collectors.toList());
    }

    private List<BookingCombo> processBookingCombos(BookingRequestDTO bookingRequest, Screening screening) {
        return bookingRequest.getComboQuantities().entrySet().stream()
                .filter(entry -> entry.getValue() > 0)
                .map(entry -> {
                    ScreeningComboPrice screeningComboPrice = screeningComboPriceRepository.findByScreeningIdAndComboId(
                                    screening.getId(), entry.getKey())
                            .orElseThrow(() -> new NoSuchElementException("Screening combo price not found with ID: " + entry.getKey()));
                    BookingCombo bookingCombo = new BookingCombo();
                    bookingCombo.setScreeningComboPrice(screeningComboPrice);
                    bookingCombo.setQuantity(entry.getValue());
                    bookingCombo.setTotalPrice(screeningComboPrice.getPrice().multiply(BigDecimal.valueOf(entry.getValue())));
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

    private TicketDTO convertToTicketDTO(Ticket ticket) {
        Screening screening = ticket.getScreening();
        Movie movie = screening.getMovie();
        Room room = screening.getRoom();
        Integer id = ticket.getId();
        User user = ticket.getUser();
        String imagePath = findImagePathByMovieId(movie.getId());
        List<String> seatNumbers = getSeatNumbersByTicketId(ticket.getId());
        BigDecimal totalSeatsPrice = calculateTotalPrice(bookingSeatRepository.findByTicketId(ticket.getId()), BookingSeat::getTotalPrice);
        BigDecimal totalComboPrice = calculateTotalPrice(bookingComboRepository.findByTicketId(ticket.getId()), BookingCombo::getTotalPrice);
        TicketStatus ticketStatus = ticket.getStatus();
        return new TicketDTO(
                id,
                imagePath,
                movie.getName(),
                movie.getRated(),
                screening.getStartTime().atZone(ZoneId.of("UTC")).toLocalDateTime(),
                Date.valueOf(screening.getDate()),
                room.getRoomNumber(),
                seatNumbers,
                totalSeatsPrice,
                totalComboPrice,
                totalSeatsPrice.add(totalComboPrice),
                ticketStatus,
                user.getUserName()
        );
    }

    @Transactional
    public void cancelTicket(int ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid ticket ID: " + ticketId));

        if (ticket.getStatus() != TicketStatus.CANCELLED) {
            ticket.setStatus(TicketStatus.CANCELLED);
            ticketRepository.save(ticket);

            List<BookingSeat> bookedSeats = bookingSeatRepository.findByTicketId(ticketId);
            for (BookingSeat bookedSeat : bookedSeats) {
                Seat seat = bookedSeat.getSeat();
                seat.setStatus(SeatStatus.AVAILABLE);
                seatRepository.save(seat);
                updateRoomStatusAfterBooking(ticket.getScreening().getRoom().getId());
            }
            Optional<Payment> optionalPayment = paymentRepository.findByTicket(ticket);
            if (optionalPayment.isPresent()) {
                Payment payment = optionalPayment.get();
                payment.setStatus(PaymentStatus.CANCELLED);
                paymentRepository.save(payment);
            }
        }
    }

    private String generateQRCode(Ticket ticket) throws Exception {
        String ticketInfo = qrCodeService.convertTicketInfoToJSON(ticket);
        String qrCodeFilePath = "path/to/qr_code_for_ticket_" + ticket.getId() + ".png";
        qrCodeService.generateQRCodeImage(ticketInfo, 200, 200, qrCodeFilePath);
        return qrCodeFilePath;
    }

    public void updateRoomStatusAfterBooking(int roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + roomId));

        long availableSeats = seatRepository.countByRoomIdAndStatus(roomId, SeatStatus.AVAILABLE);

        if (availableSeats == 0) {
            room.setStatus(RoomStatus.FULL);
            roomRepository.save(room);
        } else if (room.getStatus() == RoomStatus.FULL && availableSeats > 0) {
            room.setStatus(RoomStatus.ACTIVE);
            roomRepository.save(room);
        }
    }
}