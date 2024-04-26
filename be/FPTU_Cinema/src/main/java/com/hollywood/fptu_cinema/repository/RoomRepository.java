package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    Optional<Room> findByRoomNumber(String roomNumber);

    List<Room> findByStatusNot(Integer status);
}
