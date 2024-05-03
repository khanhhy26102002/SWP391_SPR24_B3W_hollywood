package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.enums.ScreeningStatus;
import com.hollywood.fptu_cinema.model.Screening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScreeningRepository extends JpaRepository<Screening, Integer> {
    @Query("SELECT s FROM Screening s WHERE s.endTime < :instant")
    List<Screening> findFinishedScreenings(@Param("instant") Instant instant);

    //Tim cai screening voi status
    List<Screening> findByStatusNot(ScreeningStatus status);

    List<Screening> findAllByDateAndStartTime(LocalDate date, Instant startTime);

    @Query(value = "SELECT s.movie_id, COUNT(*) as screeningCount, SUM(t.total_price) as totalRevenue " +
            "FROM Screening s " +
            "JOIN Ticket t ON s.screening_id = t.screening_id " +
            "JOIN Payment p ON t.ticket_id = p.ticket_id " +
            "WHERE s.date BETWEEN :startDate AND :endDate " +
            "AND p.status = 1 " +
            "GROUP BY s.movie_id",
            nativeQuery = true)
    List<Object[]> findMovieScreeningAndRevenueForWeek(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
