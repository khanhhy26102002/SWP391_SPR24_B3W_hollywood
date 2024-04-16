package com.hollywood.fptu_cinema.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data //thay the cho constructer rong va getter setter
@AllArgsConstructor //tat ca các constructer của hàm Login Request
public class LoginRequest {
    private String userNameOrEmail;
    private String password;
}
