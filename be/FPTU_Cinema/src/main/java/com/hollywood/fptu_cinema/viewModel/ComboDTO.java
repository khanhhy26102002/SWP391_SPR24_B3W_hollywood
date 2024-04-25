package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.model.Combo;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class ComboDTO {
    private Integer comboId;
    @NotBlank(message = "Combo name cannot be blank")
    private String comboName;

    @NotNull(message = "Combo price cannot be null")
    @Min(value = 1, message = "Combo price must be greater than 0")
    private BigDecimal comboPrice;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    private String userName;
    private Integer status;

    public ComboDTO(Combo combo) {
        this.comboId = combo.getId();
        this.comboName = combo.getComboName();
        this.description = combo.getDescription();
        this.comboPrice = combo.getComboPrice();
        this.userName = combo.getUser().getUserName();
        this.status = combo.getStatus();
    }
}
