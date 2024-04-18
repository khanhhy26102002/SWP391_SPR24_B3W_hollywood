package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.repository.UserRepository;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.validator.MovieValidator;
import com.hollywood.fptu_cinema.viewModel.MovieRequest;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
    public Movie createMovie(MovieRequest movieRequest, User currentUser) {
        Movie movie = new Movie();
        movieValidator.validate(movieRequest);
        movie.setName(movieRequest.getName());
        movie.setDescription(movieRequest.getDescription());
        movie.setActor(movieRequest.getActor());
        movie.setGenre(movieRequest.getGenre());
        movie.setDirector(movieRequest.getDirector());
        movie.setPremiere(movieRequest.getPremiere());
        movie.setTrailer(movieRequest.getTrailer());
        movie.setLanguage(movieRequest.getLanguage());
        movie.setRated(movieRequest.getRated());
        movie.setDuration(parseDuration(movieRequest.getDuration()));
        movie.setUser(currentUser);
        return movieRepository.save(movie);
    }


 //update movie
 public void updateMovie(MovieRequest movieRequest, Movie movie) {
     movieValidator.validate(movieRequest);
     movie.setName(movieRequest.getName());
     movie.setDescription(movieRequest.getDescription());
     movie.setActor(movieRequest.getActor());
     movie.setGenre(movieRequest.getGenre());
     movie.setDirector(movieRequest.getDirector());
     movie.setPremiere(movieRequest.getPremiere());
     movie.setTrailer(movieRequest.getTrailer());
     movie.setLanguage(movieRequest.getLanguage());
     movie.setRated(movieRequest.getRated());
     movie.setDuration(parseDuration(movieRequest.getDuration()));
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
