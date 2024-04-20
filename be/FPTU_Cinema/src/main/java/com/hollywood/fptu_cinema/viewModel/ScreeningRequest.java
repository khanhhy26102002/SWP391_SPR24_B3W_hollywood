package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.model.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class ScreeningRequest {
    private Integer movieId;
    private Integer roomId;
    private User user;
    private LocalDateTime start_time;
    private  LocalDateTime end_time;
    private int status;
    private Date date;

}
