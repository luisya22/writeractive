package com.writeractive.writeractiveserver.story.dto;

import com.writeractive.writeractiveserver.story.model.Story;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class StoryDtoMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public StoryDto convertToDto(Story story){

        StoryDto storyDto = modelMapper.map(story, StoryDto.class);

        if(story.getFirstChapter() != null){
            storyDto.setFirstChapterId(story.getFirstChapter().getId());
        }

        return storyDto;
    }

    public Story convertToEntity(StoryDto storyDto){
        return modelMapper.map(storyDto, Story.class);
    }
}
