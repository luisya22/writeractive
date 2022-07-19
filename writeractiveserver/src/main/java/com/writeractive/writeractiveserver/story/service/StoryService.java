package com.writeractive.writeractiveserver.story.service;

import com.writeractive.writeractiveserver.story.dto.StoryDto;
import com.writeractive.writeractiveserver.story.dto.StoryDtoMapper;
import com.writeractive.writeractiveserver.story.exception.StoryNotFoundException;
import com.writeractive.writeractiveserver.story.model.Story;
import com.writeractive.writeractiveserver.story.repository.StoryRepository;
import com.writeractive.writeractiveserver.useraccount.exception.UserNotFoundException;
import com.writeractive.writeractiveserver.useraccount.model.User;
import com.writeractive.writeractiveserver.useraccount.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class StoryService {

    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private final StoryDtoMapper storyDtoMapper;

    public StoryService(StoryRepository storyRepository, UserRepository userRepository, StoryDtoMapper storyDtoMapper) {
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
        this.storyDtoMapper = storyDtoMapper;
    }

    public StoryDto save(Long userId, StoryDto storyDto){

        Optional<User> user = userRepository.findById(userId);

        if(user.isEmpty()){
            throw new UserNotFoundException("Incorrect User Info");
        }

        storyDto.setOwner(user.get());

        if(storyDto.getSlug() == null){
            storyDto.setSlug(storyDto.getTitle().toLowerCase().replace(' ', '-'));
        }

        Story story = storyDtoMapper.convertToEntity(storyDto);

        Story storyDb = storyRepository.save(story);

        return storyDtoMapper.convertToDto(storyDb);
    }

    public StoryDto getBySlug(String slug){
        Optional<Story> storyDB = storyRepository.getStoriesBySlug(slug);

        if(storyDB.isEmpty()){
            throw new StoryNotFoundException("Story now found with slug: " + slug);
        }

        return storyDtoMapper.convertToDto(storyDB.get());
    }
}