package com.writeractive.writeractiveserver.reading.dto;

import com.writeractive.writeractiveserver.story.dto.ChapterDto;
import com.writeractive.writeractiveserver.story.model.Chapter;
import com.writeractive.writeractiveserver.story.model.Choice;
import com.writeractive.writeractiveserver.story.model.Story;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ReadingSessionDto {

    private UUID id;
    private Story story;
    private ChapterDto chapter;
    private List<Choice> choices;
    private Long userId;
}
