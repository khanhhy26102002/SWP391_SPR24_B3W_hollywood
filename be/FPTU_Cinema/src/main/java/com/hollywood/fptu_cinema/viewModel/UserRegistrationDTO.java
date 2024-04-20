package com.hollywood.fptu_cinema.viewModel;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRegistrationDTO {
    private String userName;
    private String email;
    private String address;
    private String gender;
    private LocalDate birthdate;
    private String phone;
    private String password;
}
