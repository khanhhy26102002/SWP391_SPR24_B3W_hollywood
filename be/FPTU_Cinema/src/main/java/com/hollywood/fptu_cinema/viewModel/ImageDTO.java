package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.enums.ImageStatus;
import com.hollywood.fptu_cinema.model.Image;
import com.hollywood.fptu_cinema.model.Room;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImageDTO {
    private Integer imageId;
    private Integer movieId;
    private String imageName;
    private String path;
    private ImageStatus status;
    private String userName;
    public ImageDTO(Image image) {
        this.imageId = image.getId();
        this.movieId = image.getMovie().getId();
        this.imageName = image.getImageName();
        this.path = image.getPath();
        this.status = image.getStatus();
        this.userName = image.getUser().getUserName();
    }
}
