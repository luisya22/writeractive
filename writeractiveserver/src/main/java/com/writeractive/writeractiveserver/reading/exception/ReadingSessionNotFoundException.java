package com.writeractive.writeractiveserver.reading.exception;

public class ReadingSessionNotFoundException extends RuntimeException{

    public ReadingSessionNotFoundException(String message) {
        super(message);
    }

    public ReadingSessionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
