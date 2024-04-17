package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.MovieService;
import com.hollywood.fptu_cinema.viewModel.MovieDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping(path = "api/movie")
public class MovieController {
    private static final Logger logger = LogManager.getLogger(MovieController.class);
    //Lay Service ben class movie service len
    private final MovieService movieService;

    //Tao constructor
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    //Goi tat ca cac danh sach phim ra
    @Operation(summary = "ListMovie")
    @GetMapping("/listMovie")
    //do phan hoi tu may chu tra ve nen xai response
    public ResponseEntity<?> listMovie() {
        try {
            List<MovieDTO> movies = movieService.ListMovie().stream()
                    .map(MovieDTO::new)
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
}
