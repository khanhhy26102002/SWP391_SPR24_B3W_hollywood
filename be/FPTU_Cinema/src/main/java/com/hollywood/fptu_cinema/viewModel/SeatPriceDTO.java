package com.hollywood.fptu_cinema.viewModel;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatPriceDTO {
    private int seatTypeId;

    @NotNull(message = "Price must not be null")
    @DecimalMin(value = "0.00", message = "Price must not be negative")
    private BigDecimal price;
}
