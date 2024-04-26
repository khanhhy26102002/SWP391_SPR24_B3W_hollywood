package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.model.Room;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.service.RoomService;
import com.hollywood.fptu_cinema.service.UserService;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.Response;
import com.hollywood.fptu_cinema.viewModel.RoomDTO;
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
@RequestMapping(path = "api/Room")
public class RoomController {
    private static final Logger logger = LogManager.getLogger(RoomController.class);
    private final RoomService roomService;
    private final UserService userService;

    public RoomController(RoomService roomService, UserService userService) {
        this.roomService = roomService;
        this.userService = userService;
    }

    //Danh sach tat ca cac phong phim
    @Operation(summary = "List Room Movie")
    @GetMapping("/listRoomMovie")
    //do phan hoi tu may chu tra ve nen xai responseentity
    public ResponseEntity<?> listRoom() {
        try {
            List<RoomDTO> roomDTOS = roomService.listRoom().stream()
                    .map(RoomDTO::new) // Sử dụng lambda expression thay thế constructor reference
                    .collect(Collectors.toList());

            if (roomDTOS.isEmpty()) {
                return Response.error(new Exception("No room found"));
            }

            return Response.success(roomDTOS);
        } catch (Exception e) {
            logger.error("An error occurred while listing room: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Chi tiet cua 1 room(Room chi tiet thi chi co admin và staff coi được)
    @Operation(summary = "Get Room Detail")
    @GetMapping("detail/{roomId}")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> getRoomDetails(@PathVariable int roomId) {
        try {
            //goi bien moi cho combo request (tra ve dto la co the giau duoc)
            RoomDTO roomDetails = new RoomDTO(roomService.getRoomDetails(roomId));
            return Response.success(roomDetails);
        } catch (RuntimeException e) {
            logger.error("An error occurred while getting room detail with ID {}: {}", roomId, e.getMessage());
            return Response.error(e);
        }
    }

    // Xóa Room theo trạng thái
    @Operation(summary = "Delete Room")
    @DeleteMapping("delete/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable int roomId) {
        try {
            roomService.deleteRoom(roomId);
            return Response.success("Room deleted successfully");
        } catch (RuntimeException e) {
            logger.error("An error occurred while deleting room with ID {}: {}", roomId, e.getMessage());
            return Response.error(e);
        }
    }

    //Tao moi 1 room
    @Operation(summary = "Create a new Room")
    @PostMapping("/createRoom")
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> createRoom(@Valid @RequestBody RoomDTO roomDTO) {
        try {
            //lay cai name cua nguoi dang nhap vo , gan vao bien username
            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated");
            }
            Integer userId = Integer.parseInt(userIdString);
            User currentUser = userService.findUserById(userId);

            RoomDTO room = new RoomDTO(roomService.createRoom(roomDTO, currentUser));
            return Response.success(room);
        } catch (Exception e) {
            logger.error("An error occurred while creating the room movie: {}", e.getMessage());
            return Response.error(e);
        }
    }

    //Update 1 Room
    @Operation(summary = "Update Room")
    @PutMapping("/updateRoom/{roomId}")
    // Thêm {movieId} vào đường dẫn để nhận giá trị từ đường dẫn của yêu cầu HTTP
    @Secured({"ADMIN", "STAFF"})
    public ResponseEntity<?> updateRoom(@PathVariable int roomId, @Valid @RequestBody RoomDTO roomDTO) {
        try {
            Room room = roomService.findById(roomId);
            // Gọi phương thức updateCombo từ service
            if (room == null) {
                throw new Exception("Room not found");
            }
            //current user xai token

            String userIdString = Util.currentUser();
            if (userIdString == null) {
                throw new Exception("User not authenticated"); // Ném ngoại lệ nếu không có người dùng nào được xác thực
            }
            Integer userId = Integer.parseInt(userIdString);
            //tim kiem ten nguoi dung va ket qua tra ve 1 optional
            User currentUser = userService.findUserById(userId);
            roomService.updateRoom(roomDTO, room, currentUser);
            logger.info("Room updated successfully");
            // Trả về phản hồi thành công với thông tin của combo dã cập nhật
            return Response.success(roomDTO);
        } catch (Exception e) {
            logger.error("An error occurred while updating room movie: {}", e.getMessage());
            return Response.error(e);
        }
    }
}

