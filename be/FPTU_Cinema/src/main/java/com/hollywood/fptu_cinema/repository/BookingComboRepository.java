package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.BookingCombo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingComboRepository extends JpaRepository<BookingCombo, Integer> {
    List<BookingCombo> findByTicketId(Integer ticketId);
}
