package com.hollywood.fptu_cinema.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Util {
    public static String date() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date currentDateTime = new Date();
        return dateFormat.format(currentDateTime);
    }

    public static String currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.isAuthenticated()) {
            return SecurityContextHolder.getContext().getAuthentication().getName();
        }
        return null;
    }
    public static Date expipyDate(int expiryTimeInMinute) {
        return new Date(System.currentTimeMillis() + (1000L *60*expiryTimeInMinute));
    }
}
