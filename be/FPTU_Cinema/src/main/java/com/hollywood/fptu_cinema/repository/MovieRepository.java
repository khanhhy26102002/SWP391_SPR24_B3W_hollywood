package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
}
