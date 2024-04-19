package com.hollywood.fptu_cinema.viewModel;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String token;
    private String newPassword;
    private String confirmPassword;

}
