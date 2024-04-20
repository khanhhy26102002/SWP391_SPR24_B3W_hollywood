package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.model.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ScreeningRequest {
    private Integer movieId;
    private Integer roomId;
    private User user;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private int status;
    private LocalDate date;

}
