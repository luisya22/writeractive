package com.writeractive.writeractiveserver.config.security;

import lombok.Getter;

@Getter
public class LoginRequest {
    String email;
    String password;
}
