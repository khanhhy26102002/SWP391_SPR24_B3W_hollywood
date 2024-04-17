package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.model.Movie;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class MovieDTO {
    private Integer id;
    private String imageUrl;
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
    private Instant createdDate;
    private Instant updatedDate;
    //Tao constructer
    public MovieDTO(Movie movie){
        this.id = movie.getId();
        this.imageUrl = movie.getImage().getPath();
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
    }
}
