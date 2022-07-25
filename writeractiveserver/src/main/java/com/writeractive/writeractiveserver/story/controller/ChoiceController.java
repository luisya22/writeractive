package com.writeractive.writeractiveserver.story.controller;

import com.writeractive.writeractiveserver.story.dto.ChoiceDto;
import com.writeractive.writeractiveserver.story.service.ChoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
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

    @DeleteMapping("/{choiceId}")
    public ResponseEntity<?> delete(@PathVariable UUID choiceId){

        int delete = choiceService.deleteChoiceById(choiceId);

        return ResponseEntity.ok("Deleted Successfully");
    }
}
