package com.writeractive.writeractiveserver.story.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ChapterDto {

    private UUID id;
    private String content;
    private String title;
    private boolean isFinalChapter;
    private boolean published;
    private UUID storyId;
}
