package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.validator.MovieValidator;
import com.hollywood.fptu_cinema.viewModel.MovieRequest;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final MovieValidator movieValidator = new MovieValidator();

    //Khai bao constructor cua movie service va truyen movie repository vao lam tham so
    public MovieService(MovieRepository movieRepository) {
        //Constructor gan doi tuong movieRepository
        this.movieRepository = movieRepository;
    }

    //O day ko xai long ma xai integer
    public Movie findById(int movieId) {
        return movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + movieId));
    }

    // Get details of a movie by ID
    public Movie getMovieDetails(int movieId) {
        return movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + movieId));
    }

    //create movie
    public Movie createMovie(MovieRequest movieRequest, User currentUser) {
        Movie movie = new Movie();
        setMovieDetails(movie, movieRequest, currentUser);
        //mac dinh trang thai hoat dong
        movie.setStatus(1);
        return movieRepository.save(movie);
    }


    //update movie
    public void updateMovie(MovieRequest movieRequest, Movie movie, User currentUser) {
        setMovieDetails(movie, movieRequest, currentUser);
        movieRepository.save(movie);
    }

    //list movie
    public List<Movie> listMovie() {
        return movieRepository.findByStatusNot(0);
    }

    //Delete Movie theo change status (khong phai xoa ma chi an thong tin bo phim)
    public void deleteMovie(int movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + movieId));
        movie.setStatus(0); // Set status to indicate deleted
        movieRepository.save(movie);
    }

    private LocalTime parseDuration(String duration) {
        return LocalTime.parse(duration, DateTimeFormatter.ofPattern("HH:mm:ss"));
    }

    //Goi du lieu va luu vao database(trong ngoac la nhap con set la luu)
    private void setMovieDetails(Movie movie, MovieRequest movieRequest, User currentUser) {
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
    }

}
