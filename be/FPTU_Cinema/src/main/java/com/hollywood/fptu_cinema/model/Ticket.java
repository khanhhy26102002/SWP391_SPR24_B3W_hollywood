package com.hollywood.fptu_cinema.model;

import com.hollywood.fptu_cinema.enums.TicketStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "screening_id")
    private Screening screening;

    @Column(name = "total_price", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @NotNull
    @Column(name = "expiration_time", nullable = false)
    private Instant expirationTime;

    @Size(max = 255)
    @Column(name = "qr_code")
    private String qrCode;

    @NotNull
    @ColumnDefault("1")
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private TicketStatus status;

    @PrePersist
    public void onCreate() {
        createdDate = Instant.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedDate = Instant.now();
    }

}