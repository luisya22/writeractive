package com.writeractive.writeractiveserver.story.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class VariableDto {

    private UUID id;
    private String name;
    private String value;
    private String type;
    private UUID storyId;
}
