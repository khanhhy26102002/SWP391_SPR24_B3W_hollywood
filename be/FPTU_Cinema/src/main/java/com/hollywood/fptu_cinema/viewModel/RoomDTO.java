package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.enums.RoomStatus;
import com.hollywood.fptu_cinema.model.Room;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoomDTO {
    private Integer roomId;
    private String roomNumber;
    @Min(value = 1, message = "Number of seats must be at least 1")
    private Integer numberOfSeat;
    private String userName;
    private RoomStatus status;

    public RoomDTO(Room room) {
        this.roomId = room.getId();
        this.roomNumber = room.getRoomNumber();
        this.status = room.getStatus();
        this.userName = room.getUser().getUserName();
        this.numberOfSeat = room.getNumberOfSeat();
    }


}
