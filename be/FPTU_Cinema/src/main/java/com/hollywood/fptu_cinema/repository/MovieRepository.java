package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByStatusNot(int status);
}

