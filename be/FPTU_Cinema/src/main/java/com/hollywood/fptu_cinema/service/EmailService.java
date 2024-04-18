package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.util.EmailTemplate;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final EmailTemplate emailTemplate;

    public EmailService(JavaMailSender mailSender, EmailTemplate emailTemplate) {
        this.mailSender = mailSender;
        this.emailTemplate = emailTemplate;
    }

    public void sendResetPasswordEmail(String to, String resetPasswordLink) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo(to);
        helper.setSubject("FPTU_Cinema - Yêu cầu đổi mật khẩu");
        helper.setText(emailTemplate.getResetPasswordEmail(resetPasswordLink), true);

        mailSender.send(message);
    }
}