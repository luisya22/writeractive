package com.writeractive.writeractiveserver.useraccount.exception;

import com.writeractive.writeractiveserver.exception.ApiException;
import com.writeractive.writeractiveserver.useraccount.model.RefreshToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {UserExistsException.class})
    public ResponseEntity<Object> handleUserExistsException(UserExistsException e){

        ApiException apiException =  new ApiException(
                e.getMessage(),
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now()
        );

        return new ResponseEntity<>(apiException, apiException.httpStatus());
    }

    @ExceptionHandler(value = {RefreshTokenNotFoundException.class, RoleNotFoundException.class, UserNotFoundException.class})
    public ResponseEntity<Object> handleUserExistsException(RuntimeException e){

        ApiException apiException =  new ApiException(
                e.getMessage(),
                HttpStatus.NOT_FOUND,
                LocalDateTime.now()
        );

        return new ResponseEntity<>(apiException, apiException.httpStatus());
    }
}
