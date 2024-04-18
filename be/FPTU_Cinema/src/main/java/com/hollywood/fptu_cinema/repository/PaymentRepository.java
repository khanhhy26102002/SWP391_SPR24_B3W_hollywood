package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
