package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findTicketsByExpirationTimeBefore(Instant now);
}
