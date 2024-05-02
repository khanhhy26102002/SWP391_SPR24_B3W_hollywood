package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.enums.ComboStatus;
import com.hollywood.fptu_cinema.model.Combo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComboRepository extends JpaRepository<Combo, Integer> {
    List<Combo> findByStatusNot(ComboStatus status);
}
