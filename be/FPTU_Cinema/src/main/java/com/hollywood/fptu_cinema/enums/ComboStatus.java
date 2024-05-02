package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum ComboStatus {
    UNAVAILABLE(0),
    AVAILABLE(1);

    private final int value;

    ComboStatus(int value) {
        this.value = value;
    }
}
