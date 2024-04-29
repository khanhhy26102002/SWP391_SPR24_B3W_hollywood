package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum MovieStatus {
    UNAVAILABLE(0),
    AVAILABLE(1);

    private final int value;

    MovieStatus(int value) {
        this.value = value;
    }
}
