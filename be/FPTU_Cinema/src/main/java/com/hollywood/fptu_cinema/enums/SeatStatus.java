package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum SeatStatus {
    UNAVAILABLE(0), // Represents an unavailable seat
    AVAILABLE(1);   // Represents a available seat

    private final int value;

    SeatStatus(int value) {
        this.value = value;
    }
}
