package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.viewModel.BookingRequestDTO;
import com.hollywood.fptu_cinema.viewModel.BookingResponseDTO;
import com.hollywood.fptu_cinema.viewModel.SeatQuantityDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final SeatRepository seatRepository;
    private final ScreeningRepository screeningRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final BookingComboRepository bookingComboRepository;
    private final ComboRepository comboRepository;

    public TicketService(TicketRepository ticketRepository, SeatRepository seatRepository, ScreeningRepository screeningRepository, BookingSeatRepository bookingSeatRepository, BookingComboRepository bookingComboRepository, ComboRepository comboRepository) {
        this.ticketRepository = ticketRepository;
        this.seatRepository = seatRepository;
        this.screeningRepository = screeningRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.bookingComboRepository = bookingComboRepository;
        this.comboRepository = comboRepository;
    }

    public Ticket getTicketInformation(int ticketId) {
        return ticketRepository.findTicketById(ticketId);
    }

    public BookingResponseDTO createBooking(BookingRequestDTO bookingRequest, User user) {
        Screening screening = screeningRepository.findById(bookingRequest.getScreeningId()).orElseThrow();
        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setScreening(screening);
        ticket.setCreatedDate(Instant.now());
        ticket.setExpirationTime(Instant.now().plus(Duration.ofMinutes(15)));
        ticket.setStatus(1); // 1 = Chưa thanh toán

        // Tính tổng giá tiền cho các ghế và combo trước khi lưu ticket
        BigDecimal totalSeatsPrice = BigDecimal.ZERO;
        for (SeatQuantityDTO seatQuantity : bookingRequest.getSeatsQuantities()) {
            Seat seat = seatRepository.findById(seatQuantity.getSeatId()).orElseThrow();
            totalSeatsPrice = totalSeatsPrice.add(seat.getSeatPrice().multiply(new BigDecimal(seatQuantity.getQuantity())));
        }

        BigDecimal totalComboPrice = BigDecimal.ZERO;
        for (Map.Entry<Integer, Integer> entry : bookingRequest.getComboQuantities().entrySet()) {
            Combo combo = comboRepository.findById(entry.getKey()).orElseThrow();
            totalComboPrice = totalComboPrice.add(combo.getComboPrice().multiply(new BigDecimal(entry.getValue())));
        }

        // Thiết lập tổng giá tiền cho ticket
        ticket.setTotalPrice(totalSeatsPrice.add(totalComboPrice));

        // Lưu ticket và lấy ID
        ticket = ticketRepository.save(ticket);

        // Lưu thông tin ghế đã đặt
        for (SeatQuantityDTO seatQuantity : bookingRequest.getSeatsQuantities()) {
            Seat seat = seatRepository.findById(seatQuantity.getSeatId()).orElseThrow();
            BookingSeat bookingSeat = new BookingSeat();
            bookingSeat.setTicket(ticket);
            bookingSeat.setSeat(seat);
            bookingSeat.setScreening(screening);
            bookingSeat.setQuantity(seatQuantity.getQuantity());
            bookingSeat.setTotal(seat.getSeatPrice().multiply(new BigDecimal(seatQuantity.getQuantity())));
            bookingSeatRepository.save(bookingSeat);
        }

        // Lưu thông tin combo đã chọn
        for (Map.Entry<Integer, Integer> entry : bookingRequest.getComboQuantities().entrySet()) {
            Combo combo = comboRepository.findById(entry.getKey()).orElseThrow();
            BookingCombo bookingCombo = new BookingCombo();
            bookingCombo.setTicket(ticket);
            bookingCombo.setCombo(combo);
            bookingCombo.setQuantity(entry.getValue());
            bookingCombo.setTotalAmount(combo.getComboPrice().multiply(new BigDecimal(entry.getValue())));
            bookingComboRepository.save(bookingCombo);
        }

        // Tạo và trả về response DTO
        BookingResponseDTO response = new BookingResponseDTO();
        response.setTicketId(ticket.getId());
        response.setTotalPrice(totalSeatsPrice.add(totalComboPrice));
        return response;
    }
}
