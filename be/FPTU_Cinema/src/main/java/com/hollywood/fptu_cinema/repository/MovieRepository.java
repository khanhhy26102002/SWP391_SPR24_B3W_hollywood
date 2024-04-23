package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByStatusNot(Integer status);

    Optional<Movie> findByName(String name);

    @Query("SELECT COUNT(m) FROM Movie m WHERE m.premiere BETWEEN :start AND :end")
    long countByPremiereBetween(LocalDate start, LocalDate end);
}

