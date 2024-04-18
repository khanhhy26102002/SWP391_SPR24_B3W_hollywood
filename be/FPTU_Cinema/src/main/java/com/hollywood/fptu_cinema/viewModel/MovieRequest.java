package com.hollywood.fptu_cinema.viewModel;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MovieRequest {
    private String name;
    private String description;
    private String duration;
    private String director;
    private String actor;
    private String genre;
    private String language;
    private String trailer;
    private LocalDate premiere;
    private String rated;
}
