package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.enums.RoleEnum;
import com.hollywood.fptu_cinema.model.*;
import com.hollywood.fptu_cinema.repository.MovieRepository;
import com.hollywood.fptu_cinema.repository.RoomRepository;
import com.hollywood.fptu_cinema.util.SecurityUtils;
import com.hollywood.fptu_cinema.viewModel.ComboDTO;
import com.hollywood.fptu_cinema.viewModel.RoomDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    //Khai bao constructor cua movie service va truyen movie repository vao lam tham so
    public RoomService(RoomRepository roomRepository) {
        //Constructor gan doi tuong movieRepository
        this.roomRepository = roomRepository;
    }
    public Room findById(int roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + roomId));
    }
    //Danh sach xuat phong chieu phim
    public List<Room> listRoom() {
        if (SecurityUtils.hasRole(RoleEnum.ADMIN) || SecurityUtils.hasRole(RoleEnum.STAFF)) {
            return roomRepository.findAll();
        } else {
            return roomRepository.findByStatusNot(0);
        }
    }
    // Chi tiet cua 1 Room
    public Room getRoomDetails(int roomId) {
        return findById(roomId);
    }

    //Delete Room theo change status (khong phai xoa ma chi an thong tin bo room)
    public void deleteRoom(int roomId) {
        Room room = findById(roomId);
        room.setStatus(0); // Set status to indicate deleted
        roomRepository.save(room);
    }

    //Create Room
    public Room createRoom(RoomDTO roomDTO, User currentUser) {
        Room room = new Room();
        setRoomDetails(room, roomDTO, currentUser);
        room.setStatus(1);
        return roomRepository.save(room);
    }

    //Update Room
    public void updateRoom(RoomDTO roomDTO, Room room, User currentUser) {
        setRoomDetails(room, roomDTO, currentUser);
        roomRepository.save(room);
    }

    private void setRoomDetails(Room room, RoomDTO roomDTO, User currentUser) {
        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setId(roomDTO.getRoomId());
        room.setStatus(roomDTO.getStatus());
        room.setNumberOfSeat(roomDTO.getNumberOfSeat());

    }
}