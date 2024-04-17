package com.hollywood.fptu_cinema.viewModel;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class MovieCreate {
    private String name;
    private String description;
    private LocalTime duration;
    private String director;
    private String actor;
    private String genre;
    private String language;
    private String trailer;
    private LocalDate premiere;
    private String rated;
}
