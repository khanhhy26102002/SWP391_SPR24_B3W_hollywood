package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum ImageStatus {
    UNAVAILABLE(0),
    AVAILABLE(1);
    private final int value;

    ImageStatus(int value) {
        this.value = value;
    }
}