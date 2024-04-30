package com.hollywood.fptu_cinema.model;

import com.hollywood.fptu_cinema.enums.ImageStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity

public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id", nullable = false)
    private Integer id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Size(max = 255)
    @NotNull
    @Column(name = "image_name", nullable = false)
    private String imageName;

    @Size(max = 255)
    @NotNull
    @Column(name = "path", nullable = false)
    private String path;

    @NotNull
    @ColumnDefault("1")
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private ImageStatus status;

}