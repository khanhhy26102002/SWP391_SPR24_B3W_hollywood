package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.ScreeningComboPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScreeningComboPriceRepository extends JpaRepository<ScreeningComboPrice, Integer> {
    Optional<ScreeningComboPrice> findByScreeningIdAndComboId(int screeningId, int comboId);
}
