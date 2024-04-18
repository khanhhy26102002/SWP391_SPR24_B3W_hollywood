package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Screening;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreeningRepository extends JpaRepository<Screening, Integer> {
}
