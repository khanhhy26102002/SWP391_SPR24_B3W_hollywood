package com.hollywood.fptu_cinema.validator;

import com.hollywood.fptu_cinema.viewModel.MovieCreate;
import com.hollywood.fptu_cinema.viewModel.MovieUpdate;

import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;

public class MovieValidator implements Validator<MovieCreate> {
    //validate Create
    @Override
    public void validate(MovieCreate movieCreate) {
        if (!isValidName(movieCreate.getName())) {
            throw new IllegalArgumentException("Name is invalid. It must not be empty and must be less than 255 characters.");
        }
        if (!isValidDescription(movieCreate.getDescription())) {
            throw new IllegalArgumentException("Description is invalid. It must not be empty.");
        }
        if (!isValidRated(movieCreate.getRated())) {
            throw new IllegalArgumentException("Rated value is invalid. It must be one of the following: K, C, T13, T16, T18, P.");
        }
        if (!isValidDuration(movieCreate.getDuration())) {
            throw new IllegalArgumentException("Duration format is invalid. Expected format: HH:mm:ss");
        }
    }

    //Validate update

    public void validate(MovieUpdate movieUpdate) {
        if (!isValidName(movieUpdate.getName())) {
            throw new IllegalArgumentException("Name is invalid. It must not be empty and must be less than 255 characters.");
        }
        if (!isValidDescription(movieUpdate.getDescription())) {
            throw new IllegalArgumentException("Description is invalid. It must not be empty.");
        }
        if (!isValidRated(movieUpdate.getRated())) {
            throw new IllegalArgumentException("Rated value is invalid. It must be one of the following: K, C, T13, T16, T18, P.");
        }
        if (!isValidDuration(movieUpdate.getDuration())) {
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

    // Bạn có thể thêm các phương thức xác thực khác tương tự ở đây
}