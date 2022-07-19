package com.writeractive.writeractiveserver.exception;

public class RefreshTokenNotFoundException extends RuntimeException{

    public RefreshTokenNotFoundException(){
        super ("Invalid Refresh Token");
    }

    public RefreshTokenNotFoundException(String message, Throwable cause){
        super(message, cause);
    }
}
