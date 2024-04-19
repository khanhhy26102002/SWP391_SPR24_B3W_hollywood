package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByMovieId(Integer movieId);
}
