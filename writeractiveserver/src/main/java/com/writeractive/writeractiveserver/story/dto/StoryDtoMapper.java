package com.writeractive.writeractiveserver.story.dto;

import com.writeractive.writeractiveserver.story.model.Story;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class StoryDtoMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public StoryDto convertToDto(Story story){
        return modelMapper.map(story, StoryDto.class);
    }

    public Story convertToEntity(StoryDto storyDto){
        return modelMapper.map(storyDto, Story.class);
    }
}
