package com.hollywood.fptu_cinema.util;

import org.springframework.stereotype.Component;

@Component
public class EmailTemplate {
    public String getResetPasswordEmail(String resetPasswordLink) {
        return "FPTU_Cinema đã nhận được yêu cầu thay đổi mật khẩu của quý khách.\n\n"
                + "Xin hãy click vào link bên dưới để đổi mật khẩu: (Lưu ý: link chỉ có hiệu lực trong vòng 60 phút.)\n\n"
                + resetPasswordLink + "\n\n"
                + "Mọi thắc mắc và góp ý vui lòng liên hệ với bộ phận chăm sóc khách hàng...";
    }
}
