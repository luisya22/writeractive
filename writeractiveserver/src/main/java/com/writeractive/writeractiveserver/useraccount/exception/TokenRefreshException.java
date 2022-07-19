package com.writeractive.writeractiveserver.useraccount.exception;

public class TokenRefreshException extends RuntimeException{

    public TokenRefreshException(String message) {
        super(message);
    }

    public TokenRefreshException(String message, Throwable cause) {
        super(message, cause);
    }
}
