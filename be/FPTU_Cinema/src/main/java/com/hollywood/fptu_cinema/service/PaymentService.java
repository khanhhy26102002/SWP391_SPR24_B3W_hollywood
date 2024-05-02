package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.PaymentStatus;
import com.hollywood.fptu_cinema.enums.TicketStatus;
import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.viewModel.PaymentInfoDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
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

    private final PaymentRepository paymentRepository;

    private final SeatRepository seatRepository;

    private final ScreeningSeatPriceRepository screeningSeatPriceRepository;

    private final ScreeningComboPriceRepository screeningComboPriceRepository;

    public PaymentService(ImageRepository imageRepository, TicketRepository ticketRepository, BookingSeatRepository bookingSeatRepository, BookingComboRepository bookingComboRepository, PaymentRepository paymentRepository, SeatRepository seatRepository, ScreeningSeatPriceRepository screeningSeatPriceRepository, ScreeningComboPriceRepository screeningComboPriceRepository) {
        this.imageRepository = imageRepository;
        this.ticketRepository = ticketRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.bookingComboRepository = bookingComboRepository;
        this.paymentRepository = paymentRepository;
        this.seatRepository = seatRepository;
        this.screeningSeatPriceRepository = screeningSeatPriceRepository;
        this.screeningComboPriceRepository = screeningComboPriceRepository;
    }

    public PaymentInfoDTO preparePaymentInfo(int ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found with ID: " + ticketId));
        Payment payment = paymentRepository.findByTicket(ticket)
                .orElseThrow(() -> new NoSuchElementException("Payment not found for ticket ID: " + ticketId));
        return convertToDTO(payment);
    }

    public List<PaymentInfoDTO> getAllPaymentInfoDTOs() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private BigDecimal calculateTotalPriceForSeats(List<BookingSeat> bookingSeats) {
        return bookingSeats.stream()
                .map(bookingSeat -> screeningSeatPriceRepository.findById(bookingSeat.getScreeningSeatPrice().getId())
                        .orElseThrow(() -> new NoSuchElementException("ScreeningSeatPrice not found with ID: " + bookingSeat.getScreeningSeatPrice().getId()))
                        .getPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateTotalPriceForCombos(List<BookingCombo> bookingCombos) {
        return bookingCombos.stream()
                .map(bookingCombo -> screeningComboPriceRepository.findById(bookingCombo.getScreeningComboPrice().getId())
                        .orElseThrow(() -> new NoSuchElementException("ScreeningComboPrice not found with ID: " + bookingCombo.getScreeningComboPrice().getId()))
                        .getPrice().multiply(BigDecimal.valueOf(bookingCombo.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional
    public void processPayment(int ticketId, String paymentMethod) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found with ID: " + ticketId));

        if (ticket.getStatus() == TicketStatus.UNPAID) {
            ticket.setStatus(TicketStatus.PAID);
            ticketRepository.save(ticket);
        } else {
            throw new IllegalStateException("Ticket is not in the UNPAID state.");
        }

        Payment payment = paymentRepository.findByTicket(ticket)
                .orElseGet(() -> {
                    Payment newPayment = new Payment();
                    newPayment.setTicket(ticket);
                    newPayment.setPaymentMethod(paymentMethod);
                    return newPayment;
                });

        payment.setPaymentDate(Instant.now());
        payment.setStatus(PaymentStatus.PAID);
        payment.setAmount(ticket.getTotalPrice());
        paymentRepository.save(payment);
    }

    public PaymentInfoDTO convertToDTO(Payment payment) {
        Ticket ticket = payment.getTicket();
        Screening screening = ticket.getScreening();
        Movie movie = screening.getMovie();
        Room room = screening.getRoom();

        List<BookingSeat> bookingSeats = bookingSeatRepository.findByTicketId(ticket.getId());
        List<String> seatNumbers = bookingSeats.stream()
                .map(bookingSeat -> {
                    Seat seat = seatRepository.findById(bookingSeat.getSeat().getId())
                            .orElseThrow(() -> new NoSuchElementException("Seat not found with ID: " + bookingSeat.getSeat().getId()));
                    return seat.getSeatNumber();
                })
                .collect(Collectors.toList());

        BigDecimal totalSeatsPrice = calculateTotalPriceForSeats(bookingSeats);
        List<BookingCombo> bookingCombos = bookingComboRepository.findByTicketId(ticket.getId());
        BigDecimal totalComboPrice = calculateTotalPriceForCombos(bookingCombos);

        String imagePath = imageRepository.findByMovieId(movie.getId()).stream()
                .findFirst()
                .map(Image::getPath)
                .orElse(null);

        String paymentMethod = payment.getPaymentMethod();
        ZoneId defaultZoneId = ZoneId.systemDefault();
        LocalDateTime startTime = LocalDateTime.ofInstant(screening.getStartTime(), defaultZoneId);
        LocalDateTime expirationTime = LocalDateTime.ofInstant(ticket.getExpirationTime(), defaultZoneId);
        PaymentInfoDTO paymentInfoDTO = new PaymentInfoDTO();
        return new PaymentInfoDTO(
                ticket.getId(),
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
                paymentMethod);
    }
}
