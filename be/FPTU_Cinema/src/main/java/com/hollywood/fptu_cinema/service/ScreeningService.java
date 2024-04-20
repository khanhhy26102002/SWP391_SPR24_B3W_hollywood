package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Screening;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.ScreeningRepository;
import com.hollywood.fptu_cinema.viewModel.ScreeningRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScreeningService {
    private final ScreeningRepository screeningRepository;

    public ScreeningService(ScreeningRepository screeningRepository) {
        this.screeningRepository = screeningRepository;
    }

    public Screening findById(int screeningId) {
        return screeningRepository.findById(screeningId)
                .orElseThrow(() -> new RuntimeException("Screening not found with ID: " + screeningId));
    }

    public Screening createScreening(ScreeningRequest screeningRequest, User currentUser) {
        Screening screening = new Screening();
        setScreeningDetails(screening, screeningRequest, currentUser);
        screening.setStatus(1);
        return screeningRepository.save(screening);
    }

    public void updateScreening(ScreeningRequest screeningRequest, Screening screening, User currentUser) {
        setScreeningDetails(screening, screeningRequest, currentUser);
        screeningRepository.save(screening);
    }

    public List<Screening> listScreenings() {
        return screeningRepository.findAll();
    }

    public void deleteScreening(int screeningId) {
        Screening screening = screeningRepository.findById(screeningId)
                .orElseThrow(() -> new RuntimeException("Screening not found with ID: " + screeningId));
        screeningRepository.delete(screening);
    }

    private void setScreeningDetails(Screening screening, ScreeningRequest screeningRequest, User currentUser) {

        screening.setEndTime(Instant.from(screeningRequest.getEnd_time()));
        screening.setStartTime(Instant.from(screeningRequest.getStart_time()));
//        screening.setStatus(Instant.from(screeningRequest.getStatus()));

    }
}
