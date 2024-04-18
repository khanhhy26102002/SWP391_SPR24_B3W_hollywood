package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
}
