package com.writeractive.writeractiveserver.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;


public record ApiException(String message, HttpStatus httpStatus, LocalDateTime timestamp) {

    @Override
    public String message() {
        return message;
    }

    @Override
    public HttpStatus httpStatus() {
        return httpStatus;
    }

    @Override
    public LocalDateTime timestamp() {
        return timestamp;
    }
}
