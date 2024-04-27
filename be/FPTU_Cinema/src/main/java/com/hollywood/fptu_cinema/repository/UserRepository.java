package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByPhoneOrEmail(String phone, String email);

    Optional<User> findByUserName(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByToken(String token);
}
