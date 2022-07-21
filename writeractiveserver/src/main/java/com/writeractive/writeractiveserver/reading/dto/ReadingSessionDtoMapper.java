package com.writeractive.writeractiveserver.reading.dto;

import com.writeractive.writeractiveserver.reading.model.ReadingSession;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReadingSessionDtoMapper {

    ModelMapper modelMapper = new ModelMapper();

    public ReadingSessionDto convertToDto(ReadingSession readingSession){

        ReadingSessionDto readingSessionDto = modelMapper.map(readingSession, ReadingSessionDto.class);

        readingSessionDto.setUserId(readingSession.getUser().getId());

        return readingSessionDto;
    }

    public ReadingSession convertToEntity(ReadingSessionDto readingSessionDto){
        return modelMapper.map(readingSessionDto, ReadingSession.class);
    }
}
