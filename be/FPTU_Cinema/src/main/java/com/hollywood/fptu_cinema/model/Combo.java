package com.hollywood.fptu_cinema.model;

import com.hollywood.fptu_cinema.enums.ComboStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
public class Combo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "combo_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Size(max = 255)
    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @ColumnDefault("1")
    @Column(name = "status", nullable = false)
    private ComboStatus status;

    @PrePersist
    protected void onPersist() {
        if (this.status == null) {
            this.status = ComboStatus.AVAILABLE;
        }
    }
}