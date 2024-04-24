package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.model.Combo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ComboRequest {
    private Integer comboId;
    private String comboName;
    private String description;
    private BigDecimal comboPrice;
    private String userName;

    public ComboRequest(Combo combo) {
        this.comboId = combo.getId();
        this.comboName = combo.getComboName();
        this.description = combo.getDescription();
        this.comboPrice = combo.getComboPrice();
        this.userName = combo.getUser().getUserName();
    }

}
