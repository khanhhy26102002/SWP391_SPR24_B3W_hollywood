package com.hollywood.fptu_cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class Combo {
    @Id
    @Column(name = "combo_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Size(max = 255)
    @Column(name = "combo_name")
    private String comboName;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "combo_price", precision = 10, scale = 2)
    private BigDecimal comboPrice;

}