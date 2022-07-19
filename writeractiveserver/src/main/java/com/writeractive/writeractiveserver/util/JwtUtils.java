package com.writeractive.writeractiveserver.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.writeractive.writeractiveserver.useraccount.model.RefreshToken;
import com.writeractive.writeractiveserver.useraccount.model.SecurityUser;
import com.writeractive.writeractiveserver.useraccount.repository.RefreshTokenRepository;
import com.writeractive.writeractiveserver.useraccount.service.RefreshTokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Slf4j
public class JwtUtils {

    @Value("${writeractiveserver.app.jwtSecret}")
    private String jwtSecret;

    @Value("${writeractiveserver.app.jwtExpirationMs}")
    private String jwtExpirationMs;

    @Value("${writeractiveserver.app.jwtCookieName}")
    private String jwtCookie;

    private RefreshTokenService refreshTokenService;

    public JwtUtils() {
    }


}
