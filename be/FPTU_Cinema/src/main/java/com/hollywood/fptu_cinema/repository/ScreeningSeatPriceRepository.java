package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.ScreeningSeatPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScreeningSeatPriceRepository extends JpaRepository<ScreeningSeatPrice, Integer> {
    Optional<ScreeningSeatPrice> findByScreeningIdAndSeatTypeId(int screeningId, int seatTypeId);
}
