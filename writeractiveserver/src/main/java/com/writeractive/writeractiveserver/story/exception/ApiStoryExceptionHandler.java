package com.writeractive.writeractiveserver.story.exception;

import com.writeractive.writeractiveserver.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiStoryExceptionHandler {

    @ExceptionHandler(value = {StoryNotFoundException.class, ChapterNotFoundException.class, ChoiceNotFoundException.class})
    public ResponseEntity<Object> handleNotFoundException(RuntimeException e){
        ApiException apiException = new ApiException(
                e.getMessage(),
                HttpStatus.NOT_FOUND,
                LocalDateTime.now()
        );

        return new ResponseEntity<>(apiException, apiException.httpStatus());
    }
}
