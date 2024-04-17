package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

//    public Movie CreateMovie(MovieCreate movieCreate){
//
//    }
//
//    public Movie UpdateMovie(MovieCreate movieCreate){
//
//    }
    public List<Movie> ListMovie(){
        return movieRepository.findAll();
    }
}
