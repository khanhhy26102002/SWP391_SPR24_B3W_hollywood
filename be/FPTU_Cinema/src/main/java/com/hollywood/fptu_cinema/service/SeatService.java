package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Seat;
import com.hollywood.fptu_cinema.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {
    private final SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public List<Seat> listSeats() {
        return seatRepository.findAll();
    }
}
