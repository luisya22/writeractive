package com.writeractive.writeractiveserver.story.controller;

import com.writeractive.writeractiveserver.story.dto.ChoiceDto;
import com.writeractive.writeractiveserver.story.service.ChoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.UUID;

@Controller
@RequestMapping("/api/chapters/{chapterId}/choices")
public class ChoiceController {

    private final ChoiceService choiceService;

    public ChoiceController(ChoiceService choiceService) {
        this.choiceService = choiceService;
    }

    @PostMapping
    public ResponseEntity<ChoiceDto> save(@PathVariable UUID chapterId, @RequestBody ChoiceDto choiceDto){

        ChoiceDto responseChoice = choiceService.save(chapterId, choiceDto);

        return ResponseEntity.ok(responseChoice);
    }
}