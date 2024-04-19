package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.viewModel.PaymentInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final TicketRepository ticketRepository;

    private final BookingSeatRepository bookingSeatRepository;

    private final ImageRepository imageRepository;

    @Autowired
    private final BookingComboRepository bookingComboRepository;

    public PaymentService(ImageRepository imageRepository, TicketRepository ticketRepository, BookingSeatRepository bookingSeatRepository, BookingComboRepository bookingComboRepository) {
        this.imageRepository = imageRepository;
        this.ticketRepository = ticketRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.bookingComboRepository = bookingComboRepository;
    }

    public PaymentInfoDTO preparePaymentInfo(int ticketId) {
        // Lấy thông tin vé từ cơ sở dữ liệu
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found with ID: " + ticketId));

        Screening screening = ticket.getScreening();
        Movie movie = screening.getMovie();
        Room room = screening.getRoom();

        // Lấy danh sách ghế từ các BookingSeat liên kết với vé
        List<BookingSeat> bookingSeats = bookingSeatRepository.findByTicketId(ticketId);
        List<String> seatNumbers = bookingSeats.stream()
                .map(bs -> bs.getSeat().getSeatNumber())
                .collect(Collectors.toList());

        // Tính tổng giá ghế
        BigDecimal totalSeatsPrice = bookingSeats.stream()
                .map(BookingSeat::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Lấy danh sách combo từ các BookingCombo liên kết với vé và tính tổng giá combo
        List<BookingCombo> bookingCombos = bookingComboRepository.findByTicketId(ticketId);
        BigDecimal totalComboPrice = bookingCombos.stream()
                .map(BookingCombo::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Lấy hình ảnh cho phim
        List<Image> images = imageRepository.findByMovieId(movie.getId());
        String imagePath = (images != null && !images.isEmpty()) ? images.get(0).getPath() : null;

        // Tạo PaymentInfoDTO để trả về
        PaymentInfoDTO paymentInfo = new PaymentInfoDTO();
        paymentInfo.setMovieName(movie.getName());
        paymentInfo.setImagePath(imagePath);
        paymentInfo.setRated(movie.getRated());
        paymentInfo.setScreeningDateTime(LocalDateTime.from(screening.getStartTime()));
        paymentInfo.setRoomNumber(room.getRoomNumber());
        paymentInfo.setSeatNumbers(seatNumbers);
        paymentInfo.setTotalSeatsPrice(totalSeatsPrice);
        paymentInfo.setTotalComboPrice(totalComboPrice);
        paymentInfo.setTotalAmount(totalSeatsPrice.add(totalComboPrice));
        paymentInfo.setExpirationTime(LocalDateTime.from(ticket.getExpirationTime()));
        paymentInfo.setPaymentMethod("Ví điện tử");

        return paymentInfo;
    }
}
