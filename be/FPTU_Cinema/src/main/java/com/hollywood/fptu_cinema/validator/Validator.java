package com.hollywood.fptu_cinema.validator;

public interface Validator<T> {
    void validate(T object);
}