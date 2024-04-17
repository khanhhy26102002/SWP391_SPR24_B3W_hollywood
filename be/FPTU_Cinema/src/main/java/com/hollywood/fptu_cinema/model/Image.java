package com.hollywood.fptu_cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Image", schema = "Movie_Booking_Ticket")
public class Image {
    @Id
    @Column(name = "image_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @Size(max = 255)
    @NotNull
    @Column(name = "image_name", nullable = false)
    private String imageName;

    @Size(max = 255)
    @NotNull
    @Column(name = "path", nullable = false)
    private String path;

}