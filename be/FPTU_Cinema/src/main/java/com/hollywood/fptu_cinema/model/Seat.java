package com.hollywood.fptu_cinema.model;

import com.hollywood.fptu_cinema.enums.SeatStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
public class Seat {
    @Id
    @Column(name = "seat_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private Room room;

    @Size(max = 10)
    @NotNull
    @Column(name = "seat_number", nullable = false, length = 10)
    private String seatNumber;

    @NotNull
    @ColumnDefault("1")
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private SeatStatus status;

    @Size(max = 10)
    @NotNull
    @Column(name = "seat_row", nullable = false, length = 10)
    private String seatRow;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seat_type_id")
    private SeatType seatType;

}