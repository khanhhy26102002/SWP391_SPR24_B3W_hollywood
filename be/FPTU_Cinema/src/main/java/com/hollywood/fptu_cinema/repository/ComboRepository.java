package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Combo;
import com.hollywood.fptu_cinema.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComboRepository extends JpaRepository<Combo, Integer> {
    List<Combo> findByStatusNot(int status);
}
