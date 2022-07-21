package com.writeractive.writeractiveserver.reading.exception;


public class ReadingBadRequestException extends RuntimeException{

    public ReadingBadRequestException(String message) {
        super(message);
    }

    public ReadingBadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
