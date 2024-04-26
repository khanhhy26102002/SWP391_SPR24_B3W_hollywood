package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum PaymentStatus {
    CANCELLED(0),
    PAID(1);

    private final int value;

    PaymentStatus(int value) {
        this.value = value;
    }
}
