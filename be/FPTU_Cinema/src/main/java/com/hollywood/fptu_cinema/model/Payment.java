package com.hollywood.fptu_cinema.model;

import com.hollywood.fptu_cinema.enums.PaymentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "Payment", schema = "Movie_Booking_Ticket")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    @Size(max = 50)
    @NotNull
    @Column(name = "payment_method", nullable = false, length = 50)
    private String paymentMethod = "e-wallet";

    @NotNull
    @Column(name = "payment_date", nullable = false)
    private Instant paymentDate;

    @NotNull
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @NotNull
    @Column(name = "status", nullable = false)
    private PaymentStatus status;

}