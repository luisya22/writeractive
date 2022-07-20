package com.writeractive.writeractiveserver.story.controller;

import com.writeractive.writeractiveserver.story.dto.ChapterDto;
import com.writeractive.writeractiveserver.story.service.ChapterService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stories/{storyId}/chapters")
public class ChapterController {

    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @PostMapping
    public ResponseEntity<ChapterDto> save(@PathVariable UUID storyId, @RequestBody ChapterDto chapterDto){

        ChapterDto responseChapter = chapterService.save(storyId, chapterDto);

        return ResponseEntity.ok(responseChapter);
    }

    @GetMapping
    public ResponseEntity<List<ChapterDto>> getAllStoryChapters(@PathVariable UUID storyId){
        List<ChapterDto> chapters = chapterService.getAllByStoryId(storyId);

        return ResponseEntity.ok(chapters);
    }
}
