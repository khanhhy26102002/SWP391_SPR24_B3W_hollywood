package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserNameOrEmail(String userName, String email);

    User findByUserName(String username);
}
