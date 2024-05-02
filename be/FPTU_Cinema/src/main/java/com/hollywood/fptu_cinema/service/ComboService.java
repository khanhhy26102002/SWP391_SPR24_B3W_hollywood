package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.RoleEnum;
import com.hollywood.fptu_cinema.model.Combo;
import com.hollywood.fptu_cinema.repository.ComboRepository;
import com.hollywood.fptu_cinema.util.Util;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComboService {
    private final ComboRepository comboRepository;

    public ComboService(ComboRepository comboRepository) {
        this.comboRepository = comboRepository;
    }

    public Combo findById(int id) {
        return comboRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Combo not found with ID: " + id));
    }

    public List<Combo> findAll() {
        if (Util.hasRole(RoleEnum.ADMIN) || Util.hasRole(RoleEnum.STAFF)) {
            return comboRepository.findAll();
        } else {
            return comboRepository.findByStatusNot(0);
        }
    }
}
