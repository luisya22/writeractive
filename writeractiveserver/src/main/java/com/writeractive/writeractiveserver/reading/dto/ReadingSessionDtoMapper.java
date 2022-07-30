package com.writeractive.writeractiveserver.reading.dto;

import com.writeractive.writeractiveserver.reading.model.ReadingSession;
import com.writeractive.writeractiveserver.story.dto.ChapterDtoMapper;
import com.writeractive.writeractiveserver.story.dto.StoryDtoMapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReadingSessionDtoMapper {

    ModelMapper modelMapper = new ModelMapper();
    private final ChapterDtoMapper chapterDtoMapper;
    private final StoryDtoMapper storyDtoMapper;

    public ReadingSessionDtoMapper(ChapterDtoMapper chapterDtoMapper, StoryDtoMapper storyDtoMapper) {
        this.chapterDtoMapper = chapterDtoMapper;
        this.storyDtoMapper = storyDtoMapper;
    }

    public ReadingSessionDto convertToDto(ReadingSession readingSession){

        ReadingSessionDto readingSessionDto = modelMapper.map(readingSession, ReadingSessionDto.class);

        readingSessionDto.setUserId(readingSession.getUser().getId());
        readingSessionDto.setChapter(chapterDtoMapper.convertToDto(readingSession.getChapter()));
        readingSessionDto.setStory(storyDtoMapper.convertToDto(readingSession.getStory()));

        return readingSessionDto;
    }

    public ReadingSession convertToEntity(ReadingSessionDto readingSessionDto){
        return modelMapper.map(readingSessionDto, ReadingSession.class);
    }
}
