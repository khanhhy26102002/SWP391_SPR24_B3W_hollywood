package com.hollywood.fptu_cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "Screening_combo_price", schema = "Movie_Booking_Ticket")
public class ScreeningComboPrice {
    @Id
    @Column(name = "screening_combo_price_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "screening_id")
    private Screening screening;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "combo_id")
    private Combo combo;

    @NotNull
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

}