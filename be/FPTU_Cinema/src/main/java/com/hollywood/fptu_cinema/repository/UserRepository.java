package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsernameOrEmail(String usernameOrEmail);//Dòng này có nghĩa là tìm kiếm người dùng bằng email
}
