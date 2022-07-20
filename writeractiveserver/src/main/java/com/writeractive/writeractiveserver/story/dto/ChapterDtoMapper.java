package com.writeractive.writeractiveserver.story.dto;

import com.writeractive.writeractiveserver.story.model.Chapter;
import com.writeractive.writeractiveserver.story.model.Story;
import com.writeractive.writeractiveserver.story.repository.StoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ChapterDtoMapper {

    ModelMapper modelMapper = new ModelMapper();
    private final StoryRepository storyRepository;

    public ChapterDtoMapper(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    public ChapterDto convertToDto(Chapter chapter){

        ChapterDto chapterDto = modelMapper.map(chapter, ChapterDto.class);

        chapterDto.setStoryId(chapter.getStory().getId());

        return chapterDto;
    }

    public Chapter convertToEntity(ChapterDto chapterDto){
        return modelMapper.map(chapterDto, Chapter.class);
    }
}
