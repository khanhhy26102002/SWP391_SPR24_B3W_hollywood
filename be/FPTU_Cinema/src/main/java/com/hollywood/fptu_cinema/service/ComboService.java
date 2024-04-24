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

    // Chi tiet cua 1 combo
    public Combo getComboDetails(int comboId) {
        return comboRepository.findById(comboId)
                .orElseThrow(() -> new RuntimeException("Combo not found with ID: " + comboId));
    }

    //Delete Combo theo change status (khong phai xoa ma chi an thong tin bo combo)
    public void deleteCombo(int comboId) {
        Combo combo = comboRepository.findById(comboId)
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + comboId));
        combo.setStatus(0); // Set status to indicate deleted
        comboRepository.save(combo);
    }
}
