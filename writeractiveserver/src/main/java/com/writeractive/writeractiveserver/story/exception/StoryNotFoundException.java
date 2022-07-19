package com.writeractive.writeractiveserver.story.exception;

public class StoryNotFoundException extends RuntimeException{

    public StoryNotFoundException(String message) {
        super(message);
    }

    public StoryNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
