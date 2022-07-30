package com.writeractive.writeractiveserver.reading.dto;

import com.writeractive.writeractiveserver.reading.model.ReadingSession;
import com.writeractive.writeractiveserver.story.dto.ChapterDtoMapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReadingSessionDtoMapper {

    ModelMapper modelMapper = new ModelMapper();
    private final ChapterDtoMapper chapterDtoMapper;

    public ReadingSessionDtoMapper(ChapterDtoMapper chapterDtoMapper) {
        this.chapterDtoMapper = chapterDtoMapper;
    }

    public ReadingSessionDto convertToDto(ReadingSession readingSession){

        ReadingSessionDto readingSessionDto = modelMapper.map(readingSession, ReadingSessionDto.class);

        readingSessionDto.setUserId(readingSession.getUser().getId());
        readingSessionDto.setChapter(chapterDtoMapper.convertToDto(readingSession.getChapter()));

        return readingSessionDto;
    }

    public ReadingSession convertToEntity(ReadingSessionDto readingSessionDto){
        return modelMapper.map(readingSessionDto, ReadingSession.class);
    }
}
