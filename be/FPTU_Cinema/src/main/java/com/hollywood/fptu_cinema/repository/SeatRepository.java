package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Seat;
import com.hollywood.fptu_cinema.viewModel.SeatNumberDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
    Seat findBySeatNumber(String seatNumber);
}
