package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.BookingSeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingSeatRepository extends JpaRepository<BookingSeat, Integer> {
}
