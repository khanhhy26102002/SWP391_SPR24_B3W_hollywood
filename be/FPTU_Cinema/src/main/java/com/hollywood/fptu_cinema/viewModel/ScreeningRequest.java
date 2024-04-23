package com.hollywood.fptu_cinema.viewModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hollywood.fptu_cinema.model.Screening;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public class ScreeningRequest {
    private Integer screeningId;
    private String movieName;
    private String roomNumber;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Instant start_time;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Instant end_time;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
    private LocalDate date;
    //Tao constructor
    public ScreeningRequest() {
    }
    public ScreeningRequest(Screening screening) {
        this.movieName = screening.getMovie().getName();
        this.roomNumber = screening.getRoom().getRoomNumber();
        this.start_time = screening.getStartTime();
        this.end_time = screening.getEndTime();
        this.date =screening.getDate();
        this.screeningId = screening.getId();
    }

}
