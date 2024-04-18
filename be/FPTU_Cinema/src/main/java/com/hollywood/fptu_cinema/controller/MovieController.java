package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.MovieService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.MovieCreate;
import com.hollywood.fptu_cinema.viewModel.MovieDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping(path = "api/movie")
public class MovieController {
    private static final Logger logger = LogManager.getLogger(MovieController.class);
    //Lay Service ben class movie service len
    private final MovieService movieService;
    private final UserService userService;

    //Tao constructor
    public MovieController(MovieService movieService, UserService userService) {
        this.movieService = movieService;
        this.userService = userService;
    }

    //Goi tat ca cac danh sach phim ra
    @Operation(summary = "ListMovie")
    @GetMapping("/listMovie")
    //do phan hoi tu may chu tra ve nen xai response
    public ResponseEntity<?> listMovie() {
        try {
            List<MovieDTO> movies = movieService.listMovie().stream()
                    .map(MovieDTO::new) // Thay thế constructor reference bằng lambda expression
                    .collect(Collectors.toList());
            if (movies.isEmpty()) {
                return Response.error(new Exception("No movies found"));
            }
            return Response.success(movies);
        } catch (Exception e) {
            logger.error("An error occurred while listing movies: {}", e.getMessage());
            return Response.error(e);
        }
    }

    @Operation(summary = "Create a new movie")
    @PostMapping("/createMovie")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> createMovie(@RequestBody MovieCreate movieCreate) {
        try {
            String username = Util.currentUser();
            if (username == null) {
                throw new Exception("User not authenticated");
            }
            MovieDTO movie = new MovieDTO(movieService.createMovie(movieCreate, userService.findByUserName(username)));
            return Response.success(movie);
        } catch (Exception e) {
            logger.error("An error occurred while creating the movie: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
