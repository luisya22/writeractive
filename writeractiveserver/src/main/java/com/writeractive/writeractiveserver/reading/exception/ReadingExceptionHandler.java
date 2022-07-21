package com.writeractive.writeractiveserver.reading.exception;

import com.writeractive.writeractiveserver.exception.ApiException;
import com.writeractive.writeractiveserver.story.exception.ChapterNotFoundException;
import com.writeractive.writeractiveserver.story.exception.StoryNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ReadingExceptionHandler {

    @ExceptionHandler(value = {ReadingBadRequestException.class})
    public ResponseEntity<Object> handleBadRequestException(RuntimeException e){
        ApiException apiException = new ApiException(
                e.getMessage(),
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now()
        );

        return new ResponseEntity<>(apiException, apiException.httpStatus());
    }

    @ExceptionHandler(value = {ReadingSessionNotFoundException.class})
    public ResponseEntity<Object> handleNotFoundException(RuntimeException e){
        ApiException apiException = new ApiException(
                e.getMessage(),
                HttpStatus.NOT_FOUND,
                LocalDateTime.now()
        );

        return new ResponseEntity<>(apiException, apiException.httpStatus());
    }
}
