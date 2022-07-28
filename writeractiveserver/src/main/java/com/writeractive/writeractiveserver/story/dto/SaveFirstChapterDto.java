package com.writeractive.writeractiveserver.story.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SaveFirstChapterDto {

    private UUID firstChapterId;
}
