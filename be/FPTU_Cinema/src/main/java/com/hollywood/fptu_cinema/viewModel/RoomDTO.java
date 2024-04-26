package com.hollywood.fptu_cinema.viewModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hollywood.fptu_cinema.model.Room;
import com.hollywood.fptu_cinema.model.Screening;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class RoomDTO {
    private Integer roomId;
    private String roomNumber;
    private Integer numberOfSeat;
    private Integer status;

    public RoomDTO(Room room) {
        this.roomId = room.getId();
        this.roomNumber = room.getRoomNumber();
        this.status = room.getStatus();
        this.numberOfSeat = room.getNumberOfSeat();
    }


}
