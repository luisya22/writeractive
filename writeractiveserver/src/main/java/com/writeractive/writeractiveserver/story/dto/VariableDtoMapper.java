package com.writeractive.writeractiveserver.story.dto;

import com.writeractive.writeractiveserver.story.model.Variable;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class VariableDtoMapper {

    ModelMapper modelMapper = new ModelMapper();

    public VariableDto convertToDto(Variable variable){
        VariableDto variableDto = modelMapper.map(variable, VariableDto.class);

        variableDto.setStoryId(variable.getStory().getId());

        return variableDto;
    }

    public Variable convertToEntity(VariableDto variableDto){
        return modelMapper.map(variableDto, Variable.class);
    }
}
