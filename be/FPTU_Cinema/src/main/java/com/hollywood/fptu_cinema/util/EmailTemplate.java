package com.hollywood.fptu_cinema.util;

import org.springframework.stereotype.Component;

@Component
public class EmailTemplate {
    public String getResetPasswordEmail(String resetPasswordLink) {
        return "<html>"
                + "<body>"
                + "<p>Hello,</p>"
                + "<p>FPTU_Cinema has received a request to change your password.</p>"
                + "<p>Please click on the link below to reset your password: <strong>(Note: The link is only valid for 60 minutes.)</strong></p>"
                + "<p><a href='" + resetPasswordLink + "'>Reset Password</a></p>"
                + "<p>If you did not request a password change, please ignore this email.</p>"
                + "<p>For any questions or feedback, please contact our customer care department.</p>"
                + "<p>Sincerely,</p>"
                + "<p>The FPTU_Cinema Team</p>"
                + "</body>"
                + "</html>";
    }
}
