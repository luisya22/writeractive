package com.writeractive.writeractiveserver.useraccount.controller;

import com.writeractive.writeractiveserver.useraccount.dto.TokensDto;
import com.writeractive.writeractiveserver.useraccount.dto.UserCreateDto;
import com.writeractive.writeractiveserver.useraccount.repository.RoleRepository;
import com.writeractive.writeractiveserver.useraccount.repository.UserRepository;
import com.writeractive.writeractiveserver.useraccount.service.AuthService;
import com.writeractive.writeractiveserver.useraccount.service.RefreshTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder encoder;
    private final AuthService authService;


    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder encoder,
            AuthService authService,
            RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserCreateDto userCreateDto){
        authService.signUpUser(userCreateDto);

        return ResponseEntity.ok("User created successfully");
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<TokensDto> refreshToken(
            @CookieValue(name="session") String refreshToken,
            HttpServletRequest request,
            HttpServletResponse response
    ){

        TokensDto tokensDto = authService.refreshToken(refreshToken, request.getRequestURL().toString());

        Cookie refreshTokenCookie = new Cookie("session", tokensDto.getRefreshToken());
        refreshTokenCookie.setMaxAge(8640000);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setHttpOnly(true);

        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(tokensDto);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name="session") String refreshToken, HttpServletResponse response){

        authService.logoutSession(refreshToken);

        Cookie refreshTokenCookie = new Cookie("session", null);
        refreshTokenCookie.setMaxAge(8640000);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setHttpOnly(true);

        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok("Logout successful");
    }
}
