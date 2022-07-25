package com.writeractive.writeractiveserver.story.service;

import com.writeractive.writeractiveserver.story.dto.ChoiceDto;
import com.writeractive.writeractiveserver.story.dto.ChoiceDtoMapper;
import com.writeractive.writeractiveserver.story.exception.ChapterNotFoundException;
import com.writeractive.writeractiveserver.story.exception.ChoiceNotFoundException;
import com.writeractive.writeractiveserver.story.model.Chapter;
import com.writeractive.writeractiveserver.story.model.Choice;
import com.writeractive.writeractiveserver.story.repository.ChapterRepository;
import com.writeractive.writeractiveserver.story.repository.ChoiceRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ChoiceService {

    private final ChapterRepository chapterRepository;
    private final ChoiceDtoMapper choiceDtoMapper;
    private final ChoiceRepository choiceRepository;

    public ChoiceService(ChapterRepository chapterRepository, ChoiceDtoMapper choiceDtoMapper, ChoiceRepository choiceRepository) {
        this.chapterRepository = chapterRepository;
        this.choiceDtoMapper = choiceDtoMapper;
        this.choiceRepository = choiceRepository;
    }

    public ChoiceDto save(UUID parentChapterId, ChoiceDto choiceDto){

        Optional<Chapter> parentChapter = chapterRepository.findById(parentChapterId);

        if(parentChapter.isEmpty()){
            throw new ChapterNotFoundException("Chapter not found with id: " + parentChapterId);
        }

        Optional<Chapter> nextChapter;

        Choice choice = choiceDtoMapper.convertToEntity(choiceDto);

        choice.setParentChapter(parentChapter.get());

        if(choiceDto.getNextChapterId() != null){
            nextChapter = chapterRepository.findById(choiceDto.getNextChapterId());

            if(nextChapter.isEmpty()){
                throw new ChapterNotFoundException("Selected Next Chapter not found - id: " + choiceDto.getNextChapterId());
            }

            choice.setNextChapter(nextChapter.get());
        }




        Choice choiceDB = choiceRepository.save(choice);

        return choiceDtoMapper.convertToDto(choiceDB);
    }

    public int deleteChoiceById(UUID choiceId){
        Optional<Choice> choice = choiceRepository.findById(choiceId);

        if(choice.isEmpty()){
            throw new ChoiceNotFoundException("Choice not found with id - " + choiceId);
        }

        choiceRepository.deleteById(choiceId);

        return 1;
    }
}
