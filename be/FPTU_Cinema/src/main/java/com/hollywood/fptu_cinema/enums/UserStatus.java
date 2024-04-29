package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum UserStatus {
    INACTIVE(0),
    ACTIVE(1);

    private final int value;

    UserStatus(int value) {
        this.value = value;
    }
}
