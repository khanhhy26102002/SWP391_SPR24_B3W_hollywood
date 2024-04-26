package com.hollywood.fptu_cinema.viewModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hollywood.fptu_cinema.model.Screening;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ScreeningDTO {
    private Integer screeningId;
    @NotBlank(message = "Movie name is required")
    private String movieName;

    @NotBlank(message = "Room number is required")
    private String roomNumber;
    private String createdBy;
    @NotNull(message = "Start time is required")
    @Future(message = "Start time must be in the future.")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Instant start_time;

    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future.")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Instant end_time;

    @NotNull(message = "Date time is required")
    @Future(message = "Date must be in the future.")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
    private LocalDate date;
    private Integer status;


    public ScreeningDTO(Screening screening) {
        this.movieName = screening.getMovie().getName();
        this.roomNumber = screening.getRoom().getRoomNumber();
        this.createdBy = screening.getUser().getUserName();
        this.start_time = screening.getStartTime();
        this.end_time = screening.getEndTime();
        this.date = screening.getDate();
        this.screeningId = screening.getId();
        this.status = screening.getStatus();
    }

}
