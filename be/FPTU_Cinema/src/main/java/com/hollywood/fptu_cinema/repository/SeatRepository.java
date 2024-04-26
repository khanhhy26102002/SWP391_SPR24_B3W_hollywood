package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.enums.SeatStatus;
import com.hollywood.fptu_cinema.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
    Optional<Seat> findBySeatNumberAndRoomId(String seatNumber, Integer roomId);

    List<Seat> findByRoomId(Integer id);

    long countByRoomIdAndStatus(int roomId, SeatStatus seatStatus);
}
