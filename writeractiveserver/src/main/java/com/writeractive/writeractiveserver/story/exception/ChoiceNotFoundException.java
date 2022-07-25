package com.writeractive.writeractiveserver.story.exception;


public class ChoiceNotFoundException extends RuntimeException{
    public ChoiceNotFoundException(String message) {
        super(message);
    }

    public ChoiceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
