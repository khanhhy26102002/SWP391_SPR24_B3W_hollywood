package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findTicketsByExpirationTimeBefore(Instant now);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.status = 2 AND t.createdDate BETWEEN :start AND :end")
    long countByCreatedDateBetweenAndStatusIsSold(Instant start, Instant end);

    List<Ticket> findAllByUserId(int userId);
}
