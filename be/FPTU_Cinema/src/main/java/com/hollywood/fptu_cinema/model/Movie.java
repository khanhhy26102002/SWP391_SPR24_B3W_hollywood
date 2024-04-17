package com.hollywood.fptu_cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
public class Movie {
    @Id
    @Column(name = "movie_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "image_id")
    private Image image;

    @Size(max = 255)
    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 255)
    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "duration", nullable = false)
    private LocalTime duration;

    @Size(max = 255)
    @NotNull
    @Column(name = "director", nullable = false)
    private String director;

    @Size(max = 255)
    @NotNull
    @Column(name = "actor", nullable = false)
    private String actor;

    @Size(max = 50)
    @NotNull
    @Column(name = "genre", nullable = false, length = 50)
    private String genre;

    @NotNull
    @Column(name = "premiere", nullable = false)
    private LocalDate premiere;

    @Size(max = 50)
    @NotNull
    @Column(name = "language", nullable = false, length = 50)
    private String language;

    @Size(max = 10)
    @Column(name = "rated", length = 10)
    private String rated;

    @Size(max = 255)
    @Column(name = "trailer")
    private String trailer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

    @PrePersist
    protected void onCreate() {
        createdDate = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedDate = Instant.now();
    }

}