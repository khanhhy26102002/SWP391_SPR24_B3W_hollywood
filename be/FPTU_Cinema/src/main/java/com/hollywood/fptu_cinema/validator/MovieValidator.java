package com.hollywood.fptu_cinema.validator;

import com.hollywood.fptu_cinema.viewModel.MovieRequest;
import com.hollywood.fptu_cinema.viewModel.ScreeningRequest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
//validate du lieu cho movie
public class MovieValidator implements Validator<MovieRequest> {
    //validate Create, Update
    @Override
    public void validate(MovieRequest movieRequest) {
        if (!isValidName(movieRequest.getName())) {
            throw new IllegalArgumentException("Name is invalid. It must not be empty and must be less than 255 characters.");
        }
        if (!isValidDescription(movieRequest.getDescription())) {
            throw new IllegalArgumentException("Description is invalid. It must not be empty.");
        }
        if (!isValidRated(movieRequest.getRated())) {
            throw new IllegalArgumentException("Rated value is invalid. It must be one of the following: K, C, T13, T16, T18, P.");
        }
        if (!isValidDuration(movieRequest.getDuration())) {
            throw new IllegalArgumentException("Duration format is invalid. Expected format: HH:mm:ss");
        }
    }

    private boolean isValidName(String name) {
        return name != null && !name.trim().isEmpty() && name.length() <= 255;
    }

    private boolean isValidDescription(String description) {
        return description != null && !description.trim().isEmpty();
    }

    private boolean isValidRated(String rated) {
        if (rated == null || rated.trim().isEmpty()) return true;
        List<String> validRatings = Arrays.asList("K", "C", "T13", "T16", "T18", "P");
        return validRatings.contains(rated);
    }

    private boolean isValidDuration(String duration) {
        // Phương thức xác thực độ dài phim
        try {
            LocalTime.parse(duration);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }

    //validate du lieu cho screening

}