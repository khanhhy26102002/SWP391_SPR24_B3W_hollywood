package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Combo;
import com.hollywood.fptu_cinema.repository.ComboRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComboService {
    private final ComboRepository comboRepository;

    //Khai bao constructor cua movie service va truyen movie repository vao lam tham so
    public ComboService(ComboRepository comboRepository) {
        //Constructor gan doi tuong movieRepository
        this.comboRepository = comboRepository;
    }

    //Tim kiem combo bang Id
    public Combo findById(int comboId) {
        return comboRepository.findById(comboId)
                .orElseThrow(() -> new RuntimeException("Booking combo not found with ID: " + comboId));
    }

    //danh sach combo
    public List<Combo> listCombo() {
        return comboRepository.findAll();
    }
}
