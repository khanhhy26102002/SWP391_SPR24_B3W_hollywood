package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.model.Screening;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public class ScreeningRequest {
    private Integer screeningId;
    private String movieName;
    private String roomNumber;
    private String createdBy;
    private Instant start_time;
    private Instant end_time;
    private LocalDate date;
    //Tao constructor
    public ScreeningRequest(Screening screening) {
        this.movieName = screening.getMovie().getName();
        this.roomNumber = screening.getRoom().getRoomNumber();
        this.createdBy = screening.getUser().getUserName();
        this.start_time = screening.getStartTime();
        this.end_time = screening.getEndTime();
        this.date =screening.getDate();
        this.screeningId = screening.getId();

    }
}
