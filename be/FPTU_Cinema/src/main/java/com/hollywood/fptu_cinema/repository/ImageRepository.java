package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.enums.ImageStatus;
import com.hollywood.fptu_cinema.model.Image;
import com.hollywood.fptu_cinema.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByMovieId(Integer movieId);
    List<Image> findByStatusNot (ImageStatus imageStatus);
    Optional<Image> findByImageName(String imageName);
}
