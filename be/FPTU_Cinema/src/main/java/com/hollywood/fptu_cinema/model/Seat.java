package com.hollywood.fptu_cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class Seat {
    @Id
    @Column(name = "seat_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Size(max = 10)
    @NotNull
    @Column(name = "seat_number", nullable = false, length = 10)
    private String seatNumber;

    @Size(max = 50)
    @NotNull
    @Column(name = "seat_type", nullable = false, length = 50)
    private String seatType;

    @NotNull
    @Column(name = "seat_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal seatPrice;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

}