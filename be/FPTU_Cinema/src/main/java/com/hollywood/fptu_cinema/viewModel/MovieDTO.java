package com.hollywood.fptu_cinema.viewModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hollywood.fptu_cinema.enums.MovieStatus;
import com.hollywood.fptu_cinema.model.Image;
import com.hollywood.fptu_cinema.model.Movie;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
public class MovieDTO {
    private Integer id;
    private List<String> imageUrls;
    private String name;
    private String description;
    private LocalTime duration;
    private String director;
    private String actor;
    private String genre;
    private String language;
    private String trailer;
    private String userName;
    private LocalDate premiere;
    private String rated;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Instant createdDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Instant updatedDate;
    private MovieStatus status;

    //Tao constructer
    public MovieDTO(Movie movie) {
        this.id = movie.getId();
        this.imageUrls = Optional.ofNullable(movie.getImages())
                .orElse(Collections.emptyList()).stream()
                .map(Image::getPath)
                .collect(Collectors.toList());
        this.name = movie.getName();
        this.description = movie.getDescription();
        this.duration = movie.getDuration();
        this.director = movie.getDirector();
        this.actor = movie.getActor();
        this.genre = movie.getGenre();
        this.language = movie.getLanguage();
        this.trailer = movie.getTrailer();
        this.userName = movie.getUser().getUserName();
        this.premiere = movie.getPremiere();
        this.rated = movie.getRated();
        this.updatedDate = movie.getUpdatedDate();
        this.createdDate = movie.getCreatedDate();
        this.status = movie.getStatus();
    }
}
