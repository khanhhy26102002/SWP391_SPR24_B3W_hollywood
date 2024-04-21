package com.hollywood.fptu_cinema.enums;

import lombok.Getter;

@Getter
public enum TicketStatus {
    CANCELLED(0), // Represents a cancelled or expired ticket
    UNPAID(1),    // Represents an unpaid ticket
    PAID(2);      // Represents a paid ticket

    private final int value;

    TicketStatus(int value) {
        this.value = value;
    }
}
