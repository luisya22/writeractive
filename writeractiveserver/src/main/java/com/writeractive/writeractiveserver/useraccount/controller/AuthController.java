package com.writeractive.writeractiveserver.useraccount.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.writeractive.writeractiveserver.config.security.LoginRequest;
import com.writeractive.writeractiveserver.useraccount.dto.UserCreateDto;
import com.writeractive.writeractiveserver.useraccount.model.SecurityUser;
import com.writeractive.writeractiveserver.useraccount.repository.RoleRepository;
import com.writeractive.writeractiveserver.useraccount.repository.UserRepository;
import com.writeractive.writeractiveserver.useraccount.service.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder encoder;
    AuthService authService;



    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder encoder,
            AuthService authService
    ) {
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

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()
                        )
                );

        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String accessToken = JWT.create()
                .withSubject(securityUser.getUser().getId().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
//                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", securityUser.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .sign(algorithm);

        String refreshToken = JWT.create()
                .withSubject(securityUser.getUser().getId().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
//                .withIssuer(request.getRequestURL().toString())
                .sign(algorithm);

        Map<String, String> tokens = new HashMap<>();

        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);


        return ResponseEntity.ok()
                .header("access_token", tokens.get("access_token"))
//                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(accessToken);
    }
}
