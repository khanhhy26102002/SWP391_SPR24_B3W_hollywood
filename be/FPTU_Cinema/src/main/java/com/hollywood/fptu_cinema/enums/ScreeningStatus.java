package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum ScreeningStatus {
    INACTIVE(0),
    ACTIVE(1);

    private final int value;

    ScreeningStatus(int value) {
        this.value = value;
    }
}
