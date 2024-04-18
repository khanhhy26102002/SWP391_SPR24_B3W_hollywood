package com.hollywood.fptu_cinema.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtTokenProvider {
    private static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    private final Key signKey;
    private final Set<String> blacklist = new HashSet<>();

    public JwtTokenProvider() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        this.signKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token)
                .before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        if (isTokenBlacklisted(token)) {
            return false;
        }

        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Boolean validateResetToken(String token) {
        try {
            if (isTokenBlacklisted(token) || isTokenExpired(token)) {
                return false;
            }
            Claims claims = extractAllClaims(token);
            return claims.containsKey("resetPassword");
        } catch (Exception e) {
            return false;
        }
    }

    public String generateResetToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("resetPassword", true); // Thêm claim để xác định token này là để đặt lại mật khẩu
        return createToken(claims, userName);
    }

    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .signWith(signKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public void invalidateToken(String token) {
        blacklist.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklist.contains(token);
    }
}
