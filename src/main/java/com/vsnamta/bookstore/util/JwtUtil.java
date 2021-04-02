package com.vsnamta.bookstore.util;

import java.io.UnsupportedEncodingException;
import java.time.ZonedDateTime;
import java.util.Date;

import com.vsnamta.bookstore.domain.member.MemberRole;
import com.vsnamta.bookstore.web.securiry.CustomUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

public class JwtUtil {
    private static String secretKey = "zerock12345678";
    private static long expire = 60 * 24 * 30;

    public JwtUtil() {
        
    }

    // public JwtUtil(@Value("${app.token-secret-key}") String secretKey, @Value("${app.token-expire}") long expire) {
    //     //this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    //     this.secretKey = secretKey;
    //     this.expire = expire;
    // }

    public static String generateToken(CustomUser user) throws UnsupportedEncodingException {
        return Jwts.builder()
            .setSubject(user.getId())
            .claim("name", user.getName())
            .claim("role", user.getRole().name())
            .signWith(SignatureAlgorithm.HS256, secretKey.getBytes("UTF-8"))
            .setIssuedAt(new Date())
            .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(expire).toInstant()))
            .compact();
    }

    public static CustomUser extract(String accessToken) {        
        CustomUser user = null;

        try {
            Claims claims = Jwts.parser()
                .setSigningKey(secretKey.getBytes("UTF-8"))
                .parseClaimsJws(accessToken)
                .getBody();
                
            user = new CustomUser(
                claims.getSubject(),
                claims.get("name", String.class),
                MemberRole.valueOf(claims.get("role", String.class))
            );
        } catch (ExpiredJwtException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (UnsupportedJwtException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (MalformedJwtException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SignatureException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return user;
    }
}
