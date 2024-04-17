package com.hollywood.fptu_cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @Column(name = "room_id", nullable = false)
    private Integer id;

    @Size(max = 10)
    @NotNull
    @Column(name = "room_number", nullable = false, length = 10)
    private String roomNumber;

    @NotNull
    @Column(name = "number_of_seat", nullable = false)
    private Integer numberOfSeat;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

}