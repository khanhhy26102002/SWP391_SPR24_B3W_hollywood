package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.model.Role;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String avatar;
    @NotBlank(message = "Username cannot be blank.")
    @Size(min = 2, max = 50, message = "Username must be between 2 and 50 characters.")
    private String userName;

    @NotBlank(message = "Email cannot be blank.")
    @Email(message = "Email should be valid.")
    private String email;

    @Size(max = 100, message = "Address should not be longer than 100 characters.")
    private String address;

    @Pattern(regexp = "^(?i)(male|female|other)$", message = "Invalid gender. Allowed values are MALE, FEMALE, OTHER, case insensitive.")
    private String gender;

    @Past(message = "Birthdate must be in the past.")
    private LocalDate birthdate;

    @Pattern(regexp = "^\\+?\\d{10,15}$", message = "Phone number should be valid.")
    private String phone;
    private Integer status;
    private Role role;
}
