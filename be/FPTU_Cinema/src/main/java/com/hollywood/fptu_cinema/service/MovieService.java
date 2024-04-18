package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.repository.UserRepository;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.validator.MovieValidator;
import com.hollywood.fptu_cinema.viewModel.MovieCreate;
import com.hollywood.fptu_cinema.viewModel.MovieUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final MovieValidator movieValidator = new MovieValidator();

    public MovieService(UserRepository userRepository, MovieRepository movieRepository) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    //O day ko xai long ma xai integer
    public Movie findById(int movieId) {

       return movieRepository.findById(movieId);
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
 public void updateMovie(MovieUpdate movieUpdate , Movie movie ) {
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
     User user = userRepository.findByUserName(Util.currentUser());
     movie.setUser(user);
     movieRepository.save(movie);
 }
 //list movie
    public List<Movie> listMovie() {
        return movieRepository.findAll();
    }

    private LocalTime parseDuration(String duration) {
        return LocalTime.parse(duration, DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
}
