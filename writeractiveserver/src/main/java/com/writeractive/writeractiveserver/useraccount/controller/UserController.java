package com.writeractive.writeractiveserver.useraccount.controller;

import com.writeractive.writeractiveserver.useraccount.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Value("${writeractiveserver.app.jwtRefreshExpirationMs:8400000}")
    private int refreshTokenDurationMs;

    @GetMapping
    public String index(){
        return "Hello there " + refreshTokenDurationMs;
    }

//    @PostMapping
//    public ResponseEntity<User>
}
