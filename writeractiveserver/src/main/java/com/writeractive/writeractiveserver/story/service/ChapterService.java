package com.writeractive.writeractiveserver.story.service;

import com.writeractive.writeractiveserver.story.dto.ChapterDto;
import com.writeractive.writeractiveserver.story.dto.ChapterDtoMapper;
import com.writeractive.writeractiveserver.story.exception.StoryNotFoundException;
import com.writeractive.writeractiveserver.story.model.Chapter;
import com.writeractive.writeractiveserver.story.model.Story;
import com.writeractive.writeractiveserver.story.repository.ChapterRepository;
import com.writeractive.writeractiveserver.story.repository.StoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChapterService {

    private final ChapterDtoMapper chapterDtoMapper;
    private final StoryRepository storyRepository;
    private final ChapterRepository chapterRepository;

    public ChapterService(ChapterDtoMapper chapterDtoMapper, StoryRepository storyRepository, ChapterRepository chapterRepository) {
        this.chapterDtoMapper = chapterDtoMapper;
        this.storyRepository = storyRepository;
        this.chapterRepository = chapterRepository;
    }

    public ChapterDto save(UUID storyId, ChapterDto chapterDto){

        Optional<Story> story = storyRepository.findById(storyId);

        if(story.isEmpty()){
            throw new StoryNotFoundException("Story not found with id: " + storyId);
        }

        chapterDto.setStoryId(storyId);

        Chapter chapter = chapterDtoMapper.convertToEntity(chapterDto);

        Chapter chapterDb = chapterRepository.save(chapter);

        return chapterDtoMapper.convertToDto(chapterDb);
    }

    public List<ChapterDto> getAllByStoryId(UUID storyId){
        Optional<Story> story = storyRepository.findById(storyId);

        if(story.isEmpty()){
            throw new StoryNotFoundException("Story not found with id: " + storyId);
        }

        List<Chapter> chapters = chapterRepository.findAllByStoryId(storyId);

        return chapters.stream()
                .map(chapterDtoMapper::convertToDto)
                .collect(Collectors.toList());

    }
}
