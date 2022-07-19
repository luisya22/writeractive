package com.writeractive.writeractiveserver.useraccount.dto;

import com.writeractive.writeractiveserver.useraccount.model.User;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class UserCreateDto {

    private String name;
    private String username;
    private String email;
    private String password;
    private Set<String> roles;
}
