package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.validator.MovieValidator;
import com.hollywood.fptu_cinema.viewModel.MovieCreate;
import com.hollywood.fptu_cinema.viewModel.MovieUpdate;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieValidator movieValidator = new MovieValidator();

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }
//create movie
    public Movie createMovie(MovieCreate movieCreate, User currentUser) {
        Movie movie = new Movie();
        movieValidator.validate(movieCreate);
        movie.setName(movieCreate.getName());
        movie.setDescription(movieCreate.getDescription());
        movie.setActor(movieCreate.getActor());
        movie.setGenre(movieCreate.getGenre());
        movie.setDirector(movieCreate.getDirector());
        movie.setPremiere(movieCreate.getPremiere());
        movie.setTrailer(movieCreate.getTrailer());
        movie.setLanguage(movieCreate.getLanguage());
        movie.setRated(movieCreate.getRated());
        movie.setDuration(parseDuration(movieCreate.getDuration()));
        movie.setUser(currentUser);
        return movieRepository.save(movie);
    }


 //update movie
 public Movie updateMovie(MovieUpdate movieUpdate, User currentUser) {
     Movie movie = new Movie();
     movieValidator.validate(movieUpdate);
     movie.setName(movieUpdate.getName());
     movie.setDescription(movieUpdate.getDescription());
     movie.setActor(movieUpdate.getActor());
     movie.setGenre(movieUpdate.getGenre());
     movie.setDirector(movieUpdate.getDirector());
     movie.setPremiere(movieUpdate.getPremiere());
     movie.setTrailer(movieUpdate.getTrailer());
     movie.setLanguage(movieUpdate.getLanguage());
     movie.setRated(movieUpdate.getRated());
     movie.setDuration(parseDuration(movieUpdate.getDuration()));
     movie.setUser(currentUser);
     return movieRepository.save(movie);
 }
 //list movie
    public List<Movie> listMovie() {
        return movieRepository.findAll();
    }

    private LocalTime parseDuration(String duration) {
        return LocalTime.parse(duration, DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
}
