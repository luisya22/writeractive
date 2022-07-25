package com.writeractive.writeractiveserver.story.controller;

import com.writeractive.writeractiveserver.story.dto.ChapterDto;
import com.writeractive.writeractiveserver.story.service.ChapterService;
import org.springframework.http.ResponseEntity;
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

    @PatchMapping("/{chapterId}")
    public ResponseEntity<ChapterDto> update(@PathVariable UUID storyId, @PathVariable UUID chapterId, @RequestBody ChapterDto chapterDto){

        ChapterDto responseChapter = chapterService.update(storyId, chapterId, chapterDto);

        return ResponseEntity.ok(responseChapter);
    }

    @DeleteMapping("/{chapterId}")
    public ResponseEntity<?> delete(@PathVariable UUID storyId, @PathVariable UUID chapterId){

        chapterService.delete(storyId, chapterId);

        return ResponseEntity.ok("Deleted Successfully");
    }
}
