package com.writeractive.writeractiveserver.reading.service;

import com.writeractive.writeractiveserver.reading.dto.ReadingSessionDto;
import com.writeractive.writeractiveserver.reading.dto.ReadingSessionDtoMapper;
import com.writeractive.writeractiveserver.reading.dto.UpdateReadingSessionDto;
import com.writeractive.writeractiveserver.reading.exception.ReadingBadRequestException;
import com.writeractive.writeractiveserver.reading.exception.ReadingSessionNotFoundException;
import com.writeractive.writeractiveserver.reading.model.ReadingSession;
import com.writeractive.writeractiveserver.reading.repository.ReadingSessionRepository;
import com.writeractive.writeractiveserver.story.exception.ChapterNotFoundException;
import com.writeractive.writeractiveserver.story.exception.StoryNotFoundException;
import com.writeractive.writeractiveserver.story.model.Chapter;
import com.writeractive.writeractiveserver.story.model.Story;
import com.writeractive.writeractiveserver.story.repository.ChapterRepository;
import com.writeractive.writeractiveserver.story.repository.StoryRepository;
import com.writeractive.writeractiveserver.useraccount.exception.UserNotFoundException;
import com.writeractive.writeractiveserver.useraccount.model.User;
import com.writeractive.writeractiveserver.useraccount.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReadingSessionService {

    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final ChapterRepository chapterRepository;
    private final ReadingSessionRepository readingSessionRepository;
    private final ReadingSessionDtoMapper readingSessionDtoMapper;

    public ReadingSessionService(UserRepository userRepository, StoryRepository storyRepository, ChapterRepository chapterRepository, ReadingSessionRepository readingSessionRepository, ReadingSessionDtoMapper readingSessionDtoMapper) {
        this.userRepository = userRepository;
        this.storyRepository = storyRepository;
        this.chapterRepository = chapterRepository;
        this.readingSessionRepository = readingSessionRepository;
        this.readingSessionDtoMapper = readingSessionDtoMapper;
    }

    public ReadingSessionDto save(Long userId, UUID storyId){

        User user = validateUser(userId);

        Story story = validateStory(storyId);

        validateReadingSessionDoesNotExists(user, story);

        ReadingSession readingSession = new ReadingSession(user, story, story.getFirstChapter());

        ReadingSession responseReadingSession =  readingSessionRepository.save(readingSession);

        return readingSessionDtoMapper.convertToDto(responseReadingSession);
    }

    public ReadingSessionDto update(Long userId, UUID readingId, UpdateReadingSessionDto updateReadingSessionDto){

        Optional<ReadingSession> readingSession = readingSessionRepository.findById(readingId);

        if(readingSession.isEmpty()){
            throw new ReadingBadRequestException("The reading session does not exists");
        }

        if(!Objects.equals(readingSession.get().getUser().getId(), userId)){
            throw new ReadingBadRequestException("User does not match with reading session");
        }

        Optional<Chapter> chapter = chapterRepository.findById(updateReadingSessionDto.getChoiceId());

        if(chapter.isEmpty()){
            throw new ReadingBadRequestException("The chapter does not exists");
        }

        readingSession.get().setChapter(chapter.get());

        ReadingSession readingSessionDB =  readingSessionRepository.save(readingSession.get());

        ReadingSessionDto readingSessionDto = readingSessionDtoMapper.convertToDto(readingSessionDB);

        readingSessionDto.setChoices(readingSessionDB.getChapter().getChoices());

        return readingSessionDto;
    }

    public ReadingSessionDto getByReadingSessionId(UUID readingSessionId, Long userId){

        Optional<ReadingSession> readingSession = readingSessionRepository.findById(readingSessionId);

        if(readingSession.isEmpty()){
            throw new ReadingSessionNotFoundException("Reading Session not found with id: " + readingSessionId);
        }

        if(!Objects.equals(readingSession.get().getUser().getId(), userId)){
            throw new ReadingSessionNotFoundException("Reading Session not found with id: " + readingSessionId);
        }

        ReadingSessionDto readingSessionDto = readingSessionDtoMapper.convertToDto(readingSession.get());

        readingSessionDto.setChoices(readingSession.get().getChapter().getChoices());

        return readingSessionDto;
    }


    // Helper methods

    private User validateUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if(user.isEmpty()){
            throw new UserNotFoundException("User not found with id: " + userId);
        }
        return user.get();
    }

    private Story validateStory(UUID storyId) {
        Optional<Story> story = storyRepository.findById(storyId);

        if(story.isEmpty()){
            throw new StoryNotFoundException("Story not found with id: " + storyId);
        }

        if(story.get().getFirstChapter() == null){
            throw new ReadingBadRequestException("Story does not have first chapter");
        }

        return story.get();
    }

    private void validateReadingSessionDoesNotExists(User user, Story story) {
        Optional<ReadingSession> validateReadingSession = readingSessionRepository
                .getReadingSessionByUserAndStory(user, story);

        if(validateReadingSession.isPresent()){
            throw new ReadingBadRequestException("A story reading session already exists with this user");
        }
    }
}
