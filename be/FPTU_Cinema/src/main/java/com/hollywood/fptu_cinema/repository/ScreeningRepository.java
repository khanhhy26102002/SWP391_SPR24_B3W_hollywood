package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.Screening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface ScreeningRepository extends JpaRepository<Screening, Integer> {
    @Query("SELECT s FROM Screening s WHERE s.endTime < :instant")
    List<Screening> findFinishedScreenings(@Param("instant") Instant instant);
    //Tim cai screening voi status
    List<Screening> findByStatusNot(Integer status);
}
