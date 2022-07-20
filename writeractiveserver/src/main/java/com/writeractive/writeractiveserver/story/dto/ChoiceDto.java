package com.writeractive.writeractiveserver.story.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ChoiceDto {

    private UUID id;
    private String text;
    private UUID parentId;
    private UUID nextChapterId;
}
