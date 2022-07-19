package com.writeractive.writeractiveserver.exception;

public class RoleNotFoundException extends RuntimeException  {

    public RoleNotFoundException(String role){
        super("Role " + role + " not found.");
    }

    public RoleNotFoundException(String message, Throwable cause){
        super(message, cause);
    }
}
