package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Payment;
import com.hollywood.fptu_cinema.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findByTicket(Ticket ticket);
}
