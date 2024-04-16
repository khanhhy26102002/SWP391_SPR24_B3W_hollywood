package com.hollywood.fptu_cinema.enums;

public enum ResponseText {

    SUCCESS("Request successful"),
    NOT_FOUND("Resource not found with: "),
    INTERNAL_ERROR("Internal server error: ");

    private final String message;
    ResponseText(String message) {
        this.message = message;
    }
    @Override
    public String toString() {
        return message;
    }
}
