package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.enums.MovieStatus;
import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.viewModel.MovieStatistics;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByStatusNot(MovieStatus status);

    Optional<Movie> findByName(String name);

    @Query("SELECT COUNT(m) FROM Movie m WHERE m.premiere BETWEEN :start AND :end")
    long countByPremiereBetween(LocalDate start, LocalDate end);

    // Query to get the top 4 movies based on ticket sales
    @Query("SELECT new com.hollywood.fptu_cinema.viewModel.MovieStatistics(m.name, COUNT(t)) " +
            "FROM Movie m JOIN Ticket t ON m.id = t.screening.movie.id " +
            "WHERE t.status = 2 " +
            "GROUP BY m.id, m.name ORDER BY COUNT(t) DESC")
    List<MovieStatistics> findTopMoviesByTicketsSold(Pageable pageable);
}

