package com.writeractive.writeractiveserver.story.dto;

import com.writeractive.writeractiveserver.story.model.Choice;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ChoiceDtoMapper {

    ModelMapper modelMapper = new ModelMapper();

    public ChoiceDto convertToDto(Choice choice){

        ChoiceDto choiceDto = modelMapper.map(choice, ChoiceDto.class);

        choiceDto.setParentId(choice.getParentChapter().getId());
        choiceDto.setNextChapterId(choice.getNextChapter().getId());

        return choiceDto;
    }

    public Choice convertToEntity(ChoiceDto choiceDto){
        return modelMapper.map(choiceDto, Choice.class);
    }
}
