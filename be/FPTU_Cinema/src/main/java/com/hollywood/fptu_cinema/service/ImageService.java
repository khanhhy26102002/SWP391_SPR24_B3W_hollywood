package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.ImageStatus;
import com.hollywood.fptu_cinema.enums.RoleEnum;
import com.hollywood.fptu_cinema.model.Image;
import com.hollywood.fptu_cinema.model.Movie;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.ImageRepository;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.ImageDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final MovieRepository movieRepository;

    //Khai bao constructor cua movie service va truyen movie repository vao lam tham so
    public ImageService(ImageRepository imageRepository, MovieRepository movieRepository) {
        //Constructor gan doi tuong movieRepository
        this.imageRepository = imageRepository;
        this.movieRepository = movieRepository;
    }

    public Image findById(int imageId) {
        return imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found with ID: " + imageId));
    }

    //Danh sach hinh anh
    public List<Image> listImage() {
        if (Util.hasRole(RoleEnum.ADMIN) || Util.hasRole(RoleEnum.STAFF)) {
            return imageRepository.findAll();
        } else {
            return imageRepository.findByStatusNot(ImageStatus.UNAVAILABLE);
        }
    }

    //Chi tiet cua 1 hinh anh
    public Image getImageDetails(int imageId) {
        return findById(imageId);
    }

    //Delete Image theo change status (khong phai xoa ma chi an thong tin bo image)
    public void deleteImage(int imageId) {
        Image image = findById(imageId);
        image.setStatus(ImageStatus.UNAVAILABLE); // Set status to indicate deleted
        imageRepository.save(image);
    }

    //Create Image
    public Image createImage(ImageDTO imageDTO, User currentUser) {
        Image image = new Image();
        setImageDetails(image, imageDTO, currentUser);
        image.setStatus(ImageStatus.AVAILABLE);
        return imageRepository.save(image);
    }

    //Update Room
    public void updateImage(ImageDTO imageDTO, Image image, User currentUser) {
        setImageDetails(image, imageDTO, currentUser);
        imageRepository.save(image);
    }

    private void setImageDetails(Image image, ImageDTO imageDTO, User currentUser) {
        //Tim kiem image bang image dto
        Movie movie = movieRepository.findById(imageDTO.getMovieId())
                .orElseThrow(() -> new RuntimeException("Image not found with name: " + imageDTO.getUserName()));

        image.setImageName(imageDTO.getImageName());
        image.setUser(currentUser);
        image.setPath(imageDTO.getPath());
        image.setMovie(movie);

    }

    public boolean existsByImageName(String imageName) {
        return imageRepository.findByImageName(imageName).isPresent();
    }

}

