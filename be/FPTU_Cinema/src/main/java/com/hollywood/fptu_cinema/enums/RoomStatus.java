package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum RoomStatus {
    INACTIVE(0),
    ACTIVE(1),
    FULL(2);
    private final int value;

    RoomStatus(int value) {
        this.value = value;
    }
}
