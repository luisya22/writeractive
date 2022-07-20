package com.writeractive.writeractiveserver.story.exception;

public class ChapterNotFoundException extends RuntimeException{

    public ChapterNotFoundException(String message) {
        super(message);
    }

    public ChapterNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
