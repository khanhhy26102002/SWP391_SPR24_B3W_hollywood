package com.hollywood.fptu_cinema.model;

import com.hollywood.fptu_cinema.enums.ScreeningStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Entity
public class Screening {
    @Id
    @Column(name = "screening_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @NotNull
    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @ColumnDefault("1")
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private ScreeningStatus status;

    @OneToMany(mappedBy = "screening", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ScreeningSeatPrice> seatPrices;

    @OneToMany(mappedBy = "screening", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ScreeningComboPrice> comboPrices;

}