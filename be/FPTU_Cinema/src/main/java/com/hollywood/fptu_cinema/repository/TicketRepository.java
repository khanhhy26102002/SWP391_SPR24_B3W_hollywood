package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
}
