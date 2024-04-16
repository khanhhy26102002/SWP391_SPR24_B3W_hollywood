package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.UserRepository;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public User login(String usernameOrEmail, String password){
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail);
        if(user != null && passwordEncoder.matches(password, user.getPassword())){
            return user;
        }
        return null;
    }
}
