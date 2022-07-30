package com.writeractive.writeractiveserver.reading.controller;

import com.writeractive.writeractiveserver.reading.dto.ReadingSessionDto;
import com.writeractive.writeractiveserver.reading.dto.UpdateReadingSessionDto;
import com.writeractive.writeractiveserver.reading.service.ReadingSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/readings/")
public class ReadingSessionController {

    private final ReadingSessionService readingSessionService;

    public ReadingSessionController(ReadingSessionService readingSessionService) {
        this.readingSessionService = readingSessionService;
    }

    @PostMapping("/stories/add/{storyId}")
    public ResponseEntity<ReadingSessionDto> save(@PathVariable UUID storyId){

        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        ReadingSessionDto readingSessionDto = readingSessionService.findOrSave(userId, storyId);

        return ResponseEntity.ok(readingSessionDto);
    }

    @PatchMapping("/{readingSessionId}")
    public ResponseEntity<ReadingSessionDto> update(@PathVariable UUID readingSessionId, @RequestBody UpdateReadingSessionDto updateReadingSessionDto){

        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());


        ReadingSessionDto readingSessionDto = readingSessionService
                .update(userId, readingSessionId, updateReadingSessionDto);

        return ResponseEntity.ok(readingSessionDto);
    }

    @GetMapping("/{readingSessionId}")
    public ResponseEntity<ReadingSessionDto> getById(@PathVariable UUID readingSessionId){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        ReadingSessionDto readingSessionDto = readingSessionService.getByReadingSessionId(readingSessionId, userId);

        return ResponseEntity.ok(readingSessionDto);
    }
}
