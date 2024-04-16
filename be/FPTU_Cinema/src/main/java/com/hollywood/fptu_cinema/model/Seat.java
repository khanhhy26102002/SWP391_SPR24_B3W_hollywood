package com.hollywood.fptu_cinema.model;

import jakarta.persistence.*;
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
    @Column(name = "seat_number", length = 10)
    private String seatNumber;

    @Size(max = 50)
    @Column(name = "seat_type", length = 50)
    private String seatType;

    @Column(name = "seat_price", precision = 10, scale = 2)
    private BigDecimal seatPrice;

    @Column(name = "status")
    private Integer status;

}