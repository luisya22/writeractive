package com.writeractive.writeractiveserver.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message){
        super (message);
    }

    public UserNotFoundException(String message, Throwable cause){
        super(message, cause);
    }
}
