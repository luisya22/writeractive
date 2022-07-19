package com.writeractive.writeractiveserver.config.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.writeractive.writeractiveserver.config.security.LoginRequest;
import com.writeractive.writeractiveserver.useraccount.model.RefreshToken;
import com.writeractive.writeractiveserver.useraccount.model.SecurityUser;
import com.writeractive.writeractiveserver.useraccount.service.RefreshTokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;


    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            LoginRequest authRequest = new ObjectMapper().readValue(request.getInputStream(), LoginRequest.class);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword());
            return  authenticationManager.authenticate(authenticationToken);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        String accessToken = generateAccessToken(securityUser, request.getRequestURL().toString());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(securityUser.getId());

        Cookie refreshTokenCookie = new Cookie("session", refreshToken.getToken());

        refreshTokenCookie.setMaxAge(8640000);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setHttpOnly(true);

        response.addCookie(refreshTokenCookie);

        Map<String, String> tokens = new HashMap<>();

        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken.getToken());

        response.setContentType(APPLICATION_JSON_VALUE);

        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

    // Utils
    public String generateAccessToken(SecurityUser securityUser, String url){
        Algorithm algorithm =  Algorithm.HMAC256("secret".getBytes());
        return JWT.create()
                .withSubject(securityUser.getUser().getId().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .withIssuer(url)
                .withClaim("roles", securityUser.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .sign(algorithm);
    }

}
