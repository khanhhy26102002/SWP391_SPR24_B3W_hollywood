package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.Image;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.service.ImageService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.ImageDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping(path = "api/Image")
public class ImageController {
    private static final Logger logger = LogManager.getLogger(ImageController.class);
    private final ImageService imageService;
    private final UserService userService;

    public ImageController(ImageService imageService, UserService userService) {
        this.imageService = imageService;
        this.userService = userService;
    }

    //Danh sach tat ca cac hinh anh
    @Operation(summary = "List Image Movie")
    @GetMapping("/listImageMovie")
    //do phan hoi tu may chu tra ve nen xai responseentity
    public ResponseEntity<?> listImage() {
        try {
            List<ImageDTO> imageDTOs = imageService.listImage().stream()
                    .map(ImageDTO::new) // Sử dụng lambda expression thay thế constructor reference
                    .collect(Collectors.toList());

            if (imageDTOs.isEmpty()) {
                return Response.error(new Exception("No image found"));
            }

            return Response.success(imageDTOs);
        } catch (Exception e) {
            logger.error("An error occurred while listing image: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Chi tiet cua 1 Image(Iage chi tiet thi chi co admin và staff coi được)
    @Operation(summary = "Get Image Detail")
    @GetMapping("detail/{imageId}")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> getImageDetails(@PathVariable int imageId) {
        try {
            //goi bien moi cho combo request (tra ve dto la co the giau duoc)
            ImageDTO imageDetails = new ImageDTO(imageService.getImageDetails(imageId));
            return Response.success(imageDetails);
        } catch (RuntimeException e) {
            logger.error("An error occurred while getting image detail with ID {}: {}", imageId, e.getMessage());
            return Response.error(e);
        }
    }

    // Xóa Image theo trạng thái
    @Operation(summary = "Delete Image")
    @PostMapping("delete/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable int imageId) {
        try {
            imageService.deleteImage(imageId);
            return Response.success("Image deleted successfully");
        } catch (RuntimeException e) {
            logger.error("An error occurred while deleting image with ID {}: {}", imageId, e.getMessage());
            return Response.error(e);
        }
    }

    //Tao moi 1 image
    @Operation(summary = "Create a new Image")
    @PostMapping("/createImage")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> createImage(@Valid @RequestBody ImageDTO imageDTO) {
        try {
            //lay cai name cua nguoi dang nhap vo , gan vao bien username
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            Integer userId = Integer.parseInt(userIdString);
            User currentUser = userService.findUserById(userId);

            ImageDTO image = new ImageDTO(imageService.createImage(imageDTO, currentUser));
            return Response.success(image);
        } catch (Exception e) {
            logger.error("An error occurred while creating the image movie: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Update 1 Image
    @Operation(summary = "Update Image")
    @PostMapping("/updateImage/{imageId}")
    // Thêm {imageId} vào đường dẫn để nhận giá trị từ đường dẫn của yêu cầu HTTP
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> updateImage(@PathVariable int imageId, @Valid @RequestBody ImageDTO imageDTO) {
        try {
            if (imageService.existsByImageName(imageDTO.getImageName())) {
                throw new Exception("Image Name already exists");
            }
            Image image = imageService.findById(imageId);
            // Gọi phương thức updateCombo từ service
            if (image == null) {
                throw new Exception("Image not found");
            }
            //current user xai token

            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated"); // Ném ngoại lệ nếu không có người dùng nào được xác thực
            }
            Integer userId = Integer.parseInt(userIdString);
            //tim kiem ten nguoi dung va ket qua tra ve 1 optional
            User currentUser = userService.findUserById(userId);
            imageService.updateImage(imageDTO, image, currentUser);
            logger.info("Image updated successfully");
            // Trả về phản hồi thành công với thông tin của combo dã cập nhật
            return Response.success(imageDTO);
        } catch (Exception e) {
            logger.error("An error occurred while updating image movie: {}", e.getMessage());
            return Response.error(e);
        }
    }
}