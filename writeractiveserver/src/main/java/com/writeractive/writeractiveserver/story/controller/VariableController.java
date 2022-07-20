package com.writeractive.writeractiveserver.story.controller;

import com.writeractive.writeractiveserver.story.dto.VariableDto;
import com.writeractive.writeractiveserver.story.service.VariableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stories/{storyId}/variables")
public class VariableController {

    private final VariableService variableService;

    public VariableController(VariableService variableService) {
        this.variableService = variableService;
    }

    @PostMapping
    public ResponseEntity<VariableDto> save(@PathVariable UUID storyId, @RequestBody VariableDto variableDto){

        VariableDto variable = variableService.save(storyId, variableDto);

        return ResponseEntity.ok(variable);
    }

    @GetMapping
    public ResponseEntity<List<VariableDto>> getByStoryId(@PathVariable UUID storyId){
        List<VariableDto> variables = variableService.getByStoryId(storyId);

        return ResponseEntity.ok(variables);
    }
}
