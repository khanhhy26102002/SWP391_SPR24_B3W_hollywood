package com.hollywood.fptu_cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Room {
    @Id
    @Column(name = "room_id", nullable = false)
    private Integer id;

    @Size(max = 10)
    @Column(name = "room_number", length = 10)
    private String roomNumber;

    @Column(name = "number_of_seat")
    private Integer numberOfSeat;

    @Column(name = "status")
    private Integer status;

}