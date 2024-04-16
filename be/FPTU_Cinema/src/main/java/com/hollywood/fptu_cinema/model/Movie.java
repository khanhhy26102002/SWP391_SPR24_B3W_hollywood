package com.hollywood.fptu_cinema.model;

import jakarta.persistence.*;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image image;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Size(max = 255)
    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private LocalTime duration;

    @Size(max = 255)
    @Column(name = "director")
    private String director;

    @Size(max = 255)
    @Column(name = "actor")
    private String actor;

    @Size(max = 50)
    @Column(name = "genre", length = 50)
    private String genre;

    @Column(name = "premiere")
    private LocalDate premiere;

    @Size(max = 50)
    @Column(name = "language", length = 50)
    private String language;

    @Size(max = 10)
    @Column(name = "rated", length = 10)
    private String rated;

    @Size(max = 255)
    @Column(name = "trailer")
    private String trailer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @Column(name = "status")
    private Integer status;

}