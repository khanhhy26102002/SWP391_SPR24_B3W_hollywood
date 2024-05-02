package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.enums.ComboStatus;
import com.hollywood.fptu_cinema.model.Combo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComboDTO {
    private int id;
    private String userName;
    private String name;
    private String description;
    private ComboStatus status;

    public ComboDTO(Combo combo) {
        this.id = combo.getId();
        this.userName = combo.getUser().getUserName();
        this.name = combo.getName();
        this.description = combo.getDescription();
        this.status = combo.getStatus();
    }
}
