package com.hollywood.fptu_cinema.viewModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hollywood.fptu_cinema.enums.ScreeningStatus;
import com.hollywood.fptu_cinema.model.Screening;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ScreeningDTO {
    private Integer screeningId;

    @NotNull(message = "MovieId is required")
    private Integer movieId;

    @NotNull(message = "RoomId is required")
    private Integer roomId;

    private String createdBy;

    @NotNull(message = "Start time is required")
    @Future(message = "Start time must be in the future.")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future.")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private LocalDateTime endTime;

    @NotNull(message = "Date is required")
    @Future(message = "Date must be in the future.")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
    private LocalDate date;

    private ScreeningStatus status;

    private List<SeatPriceDTO> seatPrices;
    private List<ComboPriceDTO> comboPrices;

    public ScreeningDTO(Screening screening) {
        this.screeningId = screening.getId();
        this.movieId = screening.getMovie().getId();
        this.roomId = screening.getRoom().getId();
        this.createdBy = screening.getUser().getUserName();
        this.startTime = LocalDateTime.ofInstant(screening.getStartTime(), ZoneId.of("UTC"));
        this.endTime = LocalDateTime.ofInstant(screening.getEndTime(), ZoneId.of("UTC"));
        this.date = screening.getDate();
        this.status = screening.getStatus();
        this.seatPrices = screening.getSeatPrices().stream()
                .map(seatPrice -> {
                    SeatPriceDTO dto = new SeatPriceDTO();
                    dto.setSeatTypeId(seatPrice.getSeatType().getId());
                    dto.setPrice(seatPrice.getPrice());
                    return dto;
                }).collect(Collectors.toList());
        this.comboPrices = screening.getComboPrices().stream()
                .map(comboPrice -> {
                    ComboPriceDTO dto = new ComboPriceDTO();
                    dto.setComboId(comboPrice.getCombo().getId());
                    dto.setPrice(comboPrice.getPrice());
                    return dto;
                }).collect(Collectors.toList());
    }
}
