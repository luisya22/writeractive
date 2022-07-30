package com.writeractive.writeractiveserver.reading.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UserInfoDto {

    private Long id;
    private String name;
    private String username;
}
