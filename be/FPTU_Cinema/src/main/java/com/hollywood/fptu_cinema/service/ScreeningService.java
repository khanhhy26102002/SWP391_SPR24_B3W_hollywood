package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.RoleEnum;
import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.Room;
import com.hollywood.fptu_cinema.model.Screening;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.repository.RoomRepository;
import com.hollywood.fptu_cinema.repository.ScreeningRepository;
import com.hollywood.fptu_cinema.util.SecurityUtils;
import com.hollywood.fptu_cinema.viewModel.ScreeningDTO;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ScreeningService {
    private final ScreeningRepository screeningRepository;
    private final MovieRepository movieRepository;

    private final RoomRepository roomRepository;

    public ScreeningService(ScreeningRepository screeningRepository, MovieRepository movieRepository, RoomRepository roomRepository) {
        this.screeningRepository = screeningRepository;
        this.movieRepository = movieRepository;
        this.roomRepository = roomRepository;
    }

    public Screening findById(int screeningId) {
        return screeningRepository.findById(screeningId)
                .orElseThrow(() -> new RuntimeException("Screening not found with ID: " + screeningId));
    }

    public Screening createScreening(ScreeningDTO screeningDTO, User currentUser) {
        Screening screening = new Screening();
        setScreeningDetails(screening, screeningDTO, currentUser);
        screening.setStatus(1);
        return screeningRepository.save(screening);
    }

    public void updateScreening(ScreeningDTO screeningDTO, Screening screening, User currentUser) {
        setScreeningDetails(screening, screeningDTO, currentUser);
        screeningRepository.save(screening);
    }

    public List<Screening> listScreenings() {
        if (SecurityUtils.hasRole(RoleEnum.ADMIN) || SecurityUtils.hasRole(RoleEnum.STAFF)) {
            return screeningRepository.findAll();
        } else {
            return screeningRepository.findByStatusNot(0);
        }
    }

    // Get details of a screening by ID
    public Screening getScreeningDetails(int screeningId) {
        return findById(screeningId);
    }

    //Delete Screening theo change status (khong phai xoa ma chi an thong tin bo phim)
    public void deleteScreening(int screeningId) {
        Screening screening = findById(screeningId);
        screening.setStatus(0); // Set status to indicate deleted
        screeningRepository.save(screening);
    }

    private void setScreeningDetails(Screening screening, ScreeningDTO screeningDTO, User currentUser) {
        Movie movie = movieRepository.findByName(screeningDTO.getMovieName())
                .orElseThrow(() -> new RuntimeException("Movie not found with name: " + screening.getMovie().getName()));
        Room room = roomRepository.findByRoomNumber(screeningDTO.getRoomNumber())
                .orElseThrow(() -> new RuntimeException("Room not found with roomNumber: " + (screening.getRoom().getRoomNumber())));

        screening.setMovie(movie);
        screening.setRoom(room);
        screening.setUser(currentUser);
        screening.setStartTime(Instant.from(screeningDTO.getStart_time()));
        screening.setEndTime(Instant.from(screeningDTO.getEnd_time()));
        screening.setDate(screeningDTO.getDate());
    }
}
