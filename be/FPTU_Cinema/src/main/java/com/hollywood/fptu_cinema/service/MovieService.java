package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Image;
import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.ImageRepository;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.viewModel.MovieCreate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final ImageRepository imageRepository;

    public MovieService(MovieRepository movieRepository, ImageRepository imageRepository) {
        this.movieRepository = movieRepository;
        this.imageRepository = imageRepository;
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
        if (movieCreate.getImageUrl() != null && !movieCreate.getImageUrl().isEmpty()) {
            Optional<Image> image = imageRepository.findByPath(movieCreate.getImageUrl());
            image.ifPresent(movie::setImage);
        }
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
