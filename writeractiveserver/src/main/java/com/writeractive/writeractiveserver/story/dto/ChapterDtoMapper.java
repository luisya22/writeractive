package com.writeractive.writeractiveserver.story.dto;

import com.writeractive.writeractiveserver.story.model.Chapter;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChapterDtoMapper {

    ModelMapper modelMapper = new ModelMapper();
    private final ChoiceDtoMapper choiceDtoMapper;

    public ChapterDtoMapper(ChoiceDtoMapper choiceDtoMapper) {
        this.choiceDtoMapper = choiceDtoMapper;
    }


    public ChapterDto convertToDto(Chapter chapter){

        ChapterDto chapterDto = modelMapper.map(chapter, ChapterDto.class);

        chapterDto.setStoryId(chapter.getStory().getId());

        List<ChoiceDto> choices = chapter.getChoices()
                .stream()
                .map(choiceDtoMapper::convertToDto)
                .toList();
        chapterDto.setChoices(choices);

        return chapterDto;
    }

    public Chapter convertToEntity(ChapterDto chapterDto){
        return modelMapper.map(chapterDto, Chapter.class);
    }
}
