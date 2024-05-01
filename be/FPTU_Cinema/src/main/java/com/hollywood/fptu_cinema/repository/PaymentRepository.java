package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Payment;
import com.hollywood.fptu_cinema.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findByTicket(Ticket ticket);

    @Query(value = "SELECT DATE(p.payment_date) AS paymentDay, SUM(p.amount) AS dailyRevenue " +
            "FROM payment p " +
            "WHERE p.status = 1 AND " +
            "MONTH(p.payment_date) = MONTH(CURRENT_DATE()) AND " +
            "YEAR(p.payment_date) = YEAR(CURRENT_DATE()) " +
            "GROUP BY DATE(p.payment_date) " +
            "ORDER BY DATE(p.payment_date)", nativeQuery = true)
    List<Map<String, Object>> calculateCurrentMonthRevenue();

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 1 AND p.paymentDate BETWEEN :start AND :end")
    BigDecimal calculateRevenueInDateRange(Instant start, Instant end);
}
