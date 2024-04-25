package com.hollywood.fptu_cinema.viewModel;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MovieRequest {
    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 30, message = "Name must be between 2 and 30 characters")
    private String name;

    @NotBlank(message = "Description cannot be blank")
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotNull(message = "Duration cannot be null")
    @Pattern(regexp = "^([01]?\\d|2[0-3]):[0-5]\\d:[0-5]\\d$", message = "Duration should be in the format of HH:mm:ss")
    private String duration;

    @Size(max = 100, message = "Director's name must not exceed 100 characters")
    private String director;

    @Size(max = 1000, message = "Actors' names must not exceed 1000 characters")
    private String actor;

    @Size(max = 100, message = "Genre must not exceed 100 characters")
    private String genre;

    @Size(max = 50, message = "Language must not exceed 50 characters")
    private String language;

    @NotBlank(message = "Trailer cannot be blank")
    private String trailer;

    @NotNull(message = "Premiere date cannot be null")
    @Future(message = "Premiere date must be in the future")
    private LocalDate premiere;

    @Pattern(regexp = "^(K|C|T13|T16|T18|P)$", message = "Rated must be one of the following: K, C, T13, T16, T18, P")
    private String rated;
}
