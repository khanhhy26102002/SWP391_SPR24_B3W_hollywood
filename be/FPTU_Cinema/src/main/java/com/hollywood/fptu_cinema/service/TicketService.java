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
        LocalDate date = bookingRequest.getScreeningDate();
        LocalTime time = LocalTime.parse(bookingRequest.getScreeningTime());
        ZoneId zoneId = ZoneId.systemDefault(); // or any other specific time zone if required

        // Convert LocalTime to Instant for the start of the screening on that date
        Instant screeningStartInstant = LocalDateTime.of(date, time).atZone(zoneId).toInstant();

        // Tìm kiếm suất chiếu dựa trên ngày và thời gian bắt đầu
        Screening screening = screeningRepository.findByDateAndStartTime(date, screeningStartInstant)
                .orElseThrow(() -> new NoSuchElementException("No screening found for the selected date and time"));
        // Kiểm tra thời gian hiện tại không sau 1 giờ trước thời gian bắt đầu suất chiếu
        Instant currentTime = Instant.now();
        Instant screeningStartTime = screening.getStartTime();
        if (currentTime.isAfter(screeningStartTime.minus(Duration.ofHours(1)))) {
            throw new IllegalStateException("Cannot create booking within 1 hour before screening start time.");
        }

        // Tạo vé mới và kiểm tra thời gian hết hạn
        Ticket ticket = createNewTicket(user, screening);
        if (currentTime.isAfter(ticket.getExpirationTime())) {
            throw new IllegalStateException("Booking time has expired. Please try again.");
        }

        // Tính toán giá ghế và lưu thông tin đặt ghế
        BigDecimal totalSeatsPrice = calculateTotalSeatsPrice(bookingRequest, ticket, screening);

        // Tính toán giá combo và lưu thông tin đặt combo
        BigDecimal totalComboPrice = calculateTotalComboPrice(bookingRequest);

        // Lưu thông tin đặt ghế và combo
        saveBookingSeatsAndCombos(bookingRequest, ticket, screening);

        // Cập nhật tổng giá vé và lưu vé
        BigDecimal totalPrice = totalSeatsPrice.add(totalComboPrice);
        ticket.setTotalPrice(totalPrice);
        ticketRepository.save(ticket);

        // Tạo và trả về thông tin phản hồi đặt vé
        return createBookingResponse(ticket, totalSeatsPrice, totalComboPrice);
    }

    private Ticket createNewTicket(User user, Screening screening) {
        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setScreening(screening);
        ticket.setExpirationTime(Instant.now().plus(Duration.ofMinutes(15))); // Đặt thời hạn hết hạn đặt vé
        ticket.setStatus(TicketStatus.UNPAID);
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

    private void saveBookingSeatsAndCombos(BookingRequestDTO bookingRequest, Ticket ticket, Screening screening) {
        // Lưu ghế đã đặt
        List<BookingSeat> bookingSeats = bookingRequest.getSeatNumbers().stream()
                .map(seatNumberDTO -> seatRepository.findBySeatNumber(seatNumberDTO.getSeatNumber())
                        .filter(seat -> !bookingSeatRepository.isSeatBooked(seat.getId(), screening.getId()))
                        .map(seat -> {
                            seat.setStatus(SeatStatus.UNAVAILABLE); // Đặt ghế không còn trống
                            seatRepository.save(seat);

                            BookingSeat bookingSeat = new BookingSeat();
                            bookingSeat.setTicket(ticket);
                            bookingSeat.setSeat(seat);
                            bookingSeat.setTotal(seat.getSeatPrice());
                            return bookingSeat;
                        })
                        .orElseThrow(() -> new IllegalArgumentException("Seat not found or already booked with number: " + seatNumberDTO.getSeatNumber())))
                .collect(Collectors.toList());

        bookingSeatRepository.saveAll(bookingSeats); // Lưu tất cả thông tin đặt ghế một lần

        // Lưu combo đã đặt
        List<BookingCombo> bookingCombos = bookingRequest.getComboQuantities().entrySet().stream()
                .filter(entry -> entry.getValue() > 0)
                .map(entry -> {
                    Combo combo = comboRepository.findById(entry.getKey())
                            .orElseThrow(() -> new NoSuchElementException("Combo not found with ID: " + entry.getKey()));

                    BookingCombo bookingCombo = new BookingCombo();
                    bookingCombo.setTicket(ticket);
                    bookingCombo.setCombo(combo);
                    bookingCombo.setQuantity(entry.getValue());
                    bookingCombo.setTotalAmount(combo.getComboPrice().multiply(BigDecimal.valueOf(entry.getValue())));
                    return bookingCombo;
                })
                .collect(Collectors.toList());

        bookingComboRepository.saveAll(bookingCombos); // Lưu tất cả thông tin đặt combo một lần
    }


    private BookingResponseDTO createBookingResponse(Ticket ticket, BigDecimal totalSeatsPrice, BigDecimal totalComboPrice) {
        BookingResponseDTO response = new BookingResponseDTO();
        response.setTicketId(ticket.getId());
        response.setTotalPrice(totalSeatsPrice.add(totalComboPrice));
        return response;
    }

}