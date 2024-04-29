package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.SeatType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatTypeRepository extends JpaRepository<SeatType, Integer> {
}
