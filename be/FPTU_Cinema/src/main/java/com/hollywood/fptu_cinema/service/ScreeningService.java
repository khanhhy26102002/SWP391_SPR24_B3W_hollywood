package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.RoleEnum;
import com.hollywood.fptu_cinema.enums.ScreeningStatus;
import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.*;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.ComboPriceDTO;
import com.hollywood.fptu_cinema.viewModel.ScreeningDTO;
import com.hollywood.fptu_cinema.viewModel.SeatPriceDTO;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScreeningService {
    private final ScreeningRepository screeningRepository;
    private final MovieRepository movieRepository;
    private final RoomRepository roomRepository;
    private final ScreeningSeatPriceRepository screeningSeatPriceRepository;
    private final ScreeningComboPriceRepository screeningComboPriceRepository;
    private final SeatTypeRepository seatTypeRepository;
    private final ComboRepository comboRepository;


    public ScreeningService(ScreeningRepository screeningRepository, MovieRepository movieRepository, RoomRepository roomRepository, ScreeningSeatPriceRepository screeningSeatPriceRepository, ScreeningComboPriceRepository screeningComboPriceRepository, SeatTypeRepository seatTypeRepository, ComboRepository comboRepository) {
        this.screeningRepository = screeningRepository;
        this.movieRepository = movieRepository;
        this.roomRepository = roomRepository;
        this.screeningSeatPriceRepository = screeningSeatPriceRepository;
        this.screeningComboPriceRepository = screeningComboPriceRepository;
        this.seatTypeRepository = seatTypeRepository;
        this.comboRepository = comboRepository;
    }

    public Screening findById(int screeningId) {
        return screeningRepository.findById(screeningId)
                .orElseThrow(() -> new RuntimeException("Screening not found with ID: " + screeningId));
    }

    //Tao ra xuat chieu phim
    public Screening createScreening(ScreeningDTO screeningDTO, User currentUser) {
        Screening screening = new Screening();
        setScreeningDetails(screening, screeningDTO, currentUser);
        return screeningRepository.save(screening);
    }

    //Cap nhat xuat chieu phim
    public void updateScreening(ScreeningDTO screeningDTO, Screening screening, User currentUser) {
        setScreeningDetails(screening, screeningDTO, currentUser);
        screeningRepository.save(screening);
    }

    //Danh sach xuat chieu phim
    public List<Screening> listScreenings() {
        if (Util.hasRole(RoleEnum.ADMIN) || Util.hasRole(RoleEnum.STAFF)) {
            return screeningRepository.findAll();
        } else {
            return screeningRepository.findByStatusNot(ScreeningStatus.INACTIVE);
        }
    }

    // Get details of a screening by ID
    public Screening getScreeningDetails(int screeningId) {
        return findById(screeningId);
    }

    //Delete Screening theo change status (khong phai xoa ma chi an thong tin bo phim)
    public void deleteScreening(int screeningId) {
        Screening screening = findById(screeningId);
        screening.setStatus(ScreeningStatus.INACTIVE); // Set status to indicate deleted
        screeningRepository.save(screening);
    }

    private void setScreeningDetails(Screening screening, ScreeningDTO screeningDTO, User currentUser) {
        Movie movie = movieRepository.findByName(screeningDTO.getMovieName())
                .orElseThrow(() -> new RuntimeException("Movie not found with name: " + screening.getMovie().getName()));
        Room room = roomRepository.findByRoomNumber(screeningDTO.getRoomNumber())
                .orElseThrow(() -> new RuntimeException("Room not found with roomNumber: " + (screening.getRoom().getRoomNumber())));
        List<ScreeningSeatPrice> seatPrices = createScreeningSeatPrices(screeningDTO.getSeatPrices(), screening);
        screeningSeatPriceRepository.saveAll(seatPrices);

        List<ScreeningComboPrice> comboPrices = createScreeningComboPrices(screeningDTO.getComboPrices(), screening);
        screeningComboPriceRepository.saveAll(comboPrices);
        screening.setMovie(movie);
        screening.setRoom(room);
        screening.setUser(currentUser);
        Instant startInstant = screeningDTO.getStartTime().atZone(ZoneId.of("UTC")).toInstant();
        Instant endInstant = screeningDTO.getEndTime().atZone(ZoneId.of("UTC")).toInstant();
        screening.setStartTime(startInstant);
        screening.setEndTime(endInstant);
        screening.setDate(screeningDTO.getDate());
    }

    private List<ScreeningSeatPrice> createScreeningSeatPrices(List<SeatPriceDTO> seatPriceDTOs, Screening screening) {
        return seatPriceDTOs.stream().map(seatPriceDTO -> {
            ScreeningSeatPrice seatPrice = new ScreeningSeatPrice();
            seatPrice.setScreening(screening);
            SeatType seatType = seatTypeRepository.findById(seatPriceDTO.getSeatTypeId())
                    .orElseThrow(() -> new RuntimeException("SeatType not found with ID: " + seatPriceDTO.getSeatTypeId()));
            seatPrice.setSeatType(seatType);
            seatPrice.setPrice(seatPriceDTO.getPrice());
            return seatPrice;
        }).collect(Collectors.toList());
    }

    private List<ScreeningComboPrice> createScreeningComboPrices(List<ComboPriceDTO> comboPriceDTOs, Screening screening) {
        return comboPriceDTOs.stream().map(comboPriceDTO -> {
            ScreeningComboPrice comboPrice = new ScreeningComboPrice();
            comboPrice.setScreening(screening);
            Combo combo = comboRepository.findById(comboPriceDTO.getComboId())
                    .orElseThrow(() -> new RuntimeException("Combo not found with ID: " + comboPriceDTO.getComboId()));
            comboPrice.setCombo(combo);
            comboPrice.setPrice(comboPriceDTO.getPrice());
            return comboPrice;
        }).collect(Collectors.toList());
    }
}
