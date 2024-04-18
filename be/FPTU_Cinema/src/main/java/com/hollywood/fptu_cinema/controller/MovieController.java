package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.service.MovieService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.MovieDTO;
import com.hollywood.fptu_cinema.viewModel.MovieRequest;
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
    @Operation(summary = "List Movie")
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

    //ham create
    @Operation(summary = "Create a new movie")
    @PostMapping("/createMovie")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> createMovie(@RequestBody MovieRequest movieRequest) {
        try {
            String username = Util.currentUser();
            if (username == null) {
                throw new Exception("User not authenticated");
            }
            MovieDTO movie = new MovieDTO(movieService.createMovie(movieRequest, userService.findByUserName(username)));
            return Response.success(movie);
        } catch (Exception e) {
            logger.error("An error occurred while creating the movie: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Update (Do update ne phai xai @puttingmapping)
    @Operation(summary = "Update movie")
    @PutMapping("/updateMovie/{movieId}") // Thêm {movieId} vào đường dẫn để nhận giá trị từ đường dẫn của yêu cầu HTTP
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> updateMovie(@PathVariable int movieId, @RequestBody MovieRequest movieRequest) {
        try {
            Movie movie = movieService.findById(movieId);
            // Gọi phương thức updateMovie từ service
            if (movie == null) {
                throw new Exception("Movie not found");
            }
            String username = Util.currentUser();
            if (username == null) {
                throw new Exception("User not authenticated"); // Ném ngoại lệ nếu không có người dùng nào được xác thực
            }
            User user = userService.findByUserName(username);
            movieService.updateMovie(movieRequest, movie, user);

            // Trả về phản hồi thành công với thông tin của bộ phim đã cập nhật
            return Response.success(movieRequest);
        } catch (Exception e) {
            logger.error("An error occurred while updating movies: {}", e.getMessage());
            return Response.error(e);
        }
    }
}
