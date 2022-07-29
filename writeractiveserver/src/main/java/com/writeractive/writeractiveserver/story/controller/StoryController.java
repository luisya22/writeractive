package com.writeractive.writeractiveserver.story.controller;

import com.writeractive.writeractiveserver.story.dto.SaveFirstChapterDto;
import com.writeractive.writeractiveserver.story.dto.StoryDto;
import com.writeractive.writeractiveserver.story.model.Story;
import com.writeractive.writeractiveserver.story.service.StoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    private final StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @PostMapping
    public ResponseEntity<StoryDto> save(@RequestBody StoryDto storyDto){

        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        StoryDto responseStory = storyService.save(userId, storyDto);

        return ResponseEntity.ok(responseStory);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<StoryDto> getBuSlug(@PathVariable String slug){

        StoryDto story = storyService.getBySlug(slug);

        return ResponseEntity.ok(story);
    }

    @GetMapping("/user")
    public ResponseEntity<List<StoryDto>> getLoggedInUserStories(){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        List<StoryDto> stories = storyService.getByUserId(userId);

        return ResponseEntity.ok(stories);
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<StoryDto> getStoryById(@PathVariable UUID id){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        StoryDto story = storyService.getById(id, userId);

        return ResponseEntity.ok(story);
    }

    @PatchMapping("/{id}/firstchapter")
    public ResponseEntity<StoryDto> saveFirstChapter(@PathVariable UUID id, @RequestBody SaveFirstChapterDto saveFirstChapterDto){

        StoryDto story = storyService.saveFirstChapter(id, saveFirstChapterDto);

        return ResponseEntity.ok(story);
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<StoryDto> publish(@PathVariable UUID id){
        StoryDto story = storyService.publishStory(id);

        return ResponseEntity.ok(story);
    }

    @GetMapping
    public ResponseEntity<List<StoryDto>> getAll(){

        List<StoryDto> stories = storyService.getAll();
        return ResponseEntity.ok(stories);
    }
}
