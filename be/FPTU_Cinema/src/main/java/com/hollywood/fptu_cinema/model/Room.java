package com.hollywood.fptu_cinema.model;

import com.hollywood.fptu_cinema.enums.RoomStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Room", schema = "Movie_Booking_Ticket")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", nullable = false)
    private Integer id;

    @Size(max = 10)
    @NotNull
    @Column(name = "room_number", nullable = false, length = 10)
    private String roomNumber;

    @NotNull
    @Min(1)
    @Column(name = "number_of_seat", nullable = false)
    private Integer numberOfSeat;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private RoomStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
}