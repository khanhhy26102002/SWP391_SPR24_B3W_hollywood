package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.viewModel.MovieCreate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie CreateMovie(MovieCreate movieCreate, User currentUser) {
        Movie movie = new Movie();
        movie.setName(movieCreate.getName());
        movie.setDescription(movieCreate.getDescription());
        movie.setActor(movieCreate.getActor());
        movie.setGenre(movieCreate.getGenre());
        movie.setDirector(movieCreate.getDirector());
        movie.setPremiere(movieCreate.getPremiere());
        movie.setTrailer(movieCreate.getTrailer());
        movie.setLanguage(movieCreate.getLanguage());
        movie.setRated(movieCreate.getRated());
        movie.setDuration(movieCreate.getDuration());
        movie.setUser(currentUser);
        return movieRepository.save(movie);
    }

    //
//    public Movie UpdateMovie(MovieCreate movieCreate){
//
//    }
    public List<Movie> ListMovie() {
        return movieRepository.findAll();
    }
}
