package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.BookingSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingSeatRepository extends JpaRepository<BookingSeat, Integer> {
    List<BookingSeat> findByTicketId(int ticketId);

    @Query("SELECT COUNT(bs) > 0 FROM BookingSeat bs WHERE bs.seat.id = :seatId AND bs.ticket.screening.id = :screeningId")
    boolean isSeatBooked(@Param("seatId") Integer seatId, @Param("screeningId") Integer screeningId);
}
