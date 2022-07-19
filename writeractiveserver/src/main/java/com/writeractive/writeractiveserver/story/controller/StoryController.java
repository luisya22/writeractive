package com.writeractive.writeractiveserver.story.controller;

import com.writeractive.writeractiveserver.story.dto.StoryDto;
import com.writeractive.writeractiveserver.story.service.StoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/stories")
public class StoryController {

    private final StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @PostMapping
    public ResponseEntity<StoryDto> save(@RequestBody StoryDto storyDto){

        Long id = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        StoryDto responseStory = storyService.save(id, storyDto);

        return ResponseEntity.ok(responseStory);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<StoryDto> getBuSlug(@PathVariable String slug){

        StoryDto story = storyService.getBySlug(slug);

        return ResponseEntity.ok(story);
    }
}
