package com.hollywood.fptu_cinema.viewModel;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRegistrationDTO {
    @NotBlank(message = "Email cannot be blank.")
    @Email(message = "Email should be valid.")
    private String email;

    @NotBlank(message = "Username cannot be blank.")
    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters.")
    private String userName;

    @NotBlank(message = "Password cannot be blank.")
    @Size(min = 8, message = "Password must be at least 8 characters long.")
    private String password;
    private String address;
    private String gender;
    private LocalDate birthdate;
    @NotBlank(message = "Phone cannot be blank.")
    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 digits.")
    @Pattern(regexp = "[0-9]+", message = "Phone number must be numeric.")
    private String phone;
}
