package com.hollywood.fptu_cinema.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String avatar;
    private String userName;
    private String email;
    private String address;
    private String gender;
    private LocalDate birthdate;
    private String phone;
    private String roleName;
}
