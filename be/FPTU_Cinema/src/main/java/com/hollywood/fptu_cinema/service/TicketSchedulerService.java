package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.TicketStatus;
import com.hollywood.fptu_cinema.model.Ticket;
import com.hollywood.fptu_cinema.repository.TicketRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
public class TicketSchedulerService {

    private final TicketRepository ticketRepository;

    public TicketSchedulerService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // Công việc nền để hủy bỏ vé hết hạn
    @Scheduled(fixedRate = 60000) // ví dụ: chạy mỗi phút
    public void cancelExpiredTicketsTask() {
        // Lấy thời điểm hiện tại
        Instant now = Instant.now();
        // Lấy danh sách các vé hết hạn
        List<Ticket> expiredTickets = ticketRepository.findTicketsByExpirationTimeBefore(now);
        for (Ticket ticket : expiredTickets) {
            if (ticket.getStatus() == TicketStatus.UNPAID) {
                // Đặt trạng thái vé thành CANCELLED
                ticket.setStatus(TicketStatus.CANCELLED);
                // Lưu thay đổi vào cơ sở dữ liệu
                ticketRepository.save(ticket);
            }
        }
    }
}
