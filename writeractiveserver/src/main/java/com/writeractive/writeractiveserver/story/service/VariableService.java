package com.writeractive.writeractiveserver.story.service;

import com.writeractive.writeractiveserver.story.dto.VariableDto;
import com.writeractive.writeractiveserver.story.dto.VariableDtoMapper;
import com.writeractive.writeractiveserver.story.exception.StoryNotFoundException;
import com.writeractive.writeractiveserver.story.model.Story;
import com.writeractive.writeractiveserver.story.model.Variable;
import com.writeractive.writeractiveserver.story.repository.StoryRepository;
import com.writeractive.writeractiveserver.story.repository.VariableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VariableService {

    private final StoryRepository storyRepository;
    private final VariableRepository variableRepository;
    private final VariableDtoMapper variableDtoMapper;

    public VariableService(StoryRepository storyRepository, VariableRepository variableRepository, VariableDtoMapper variableDtoMapper) {
        this.storyRepository = storyRepository;
        this.variableRepository = variableRepository;
        this.variableDtoMapper = variableDtoMapper;
    }

    public VariableDto save(UUID storyId, VariableDto variableDto){

        Optional<Story> story =  storyRepository.findById(storyId);

        if(story.isEmpty()){
            throw new StoryNotFoundException("Story not found with id: " + storyId);
        }

        Variable variable = variableDtoMapper.convertToEntity(variableDto);

        variable.setStory(story.get());

        Variable responseVariable = variableRepository.save(variable);

        return variableDtoMapper.convertToDto(responseVariable);
    }

    public List<VariableDto> getByStoryId(UUID storyId){
        Optional<Story> story =  storyRepository.findById(storyId);

        if(story.isEmpty()){
            throw new StoryNotFoundException("Story not found with id: " + storyId);
        }

        List<Variable> variables = variableRepository.getVariablesByStoryId(storyId);

        return variables.stream()
                .map(variableDtoMapper::convertToDto)
                .collect(Collectors.toList());
    }
}
