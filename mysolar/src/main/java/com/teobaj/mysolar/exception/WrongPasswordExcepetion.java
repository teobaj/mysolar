package com.teobaj.mysolar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.FORBIDDEN)
public class WrongPasswordExcepetion extends RuntimeException{
    private String msg;

    public WrongPasswordExcepetion(String msg){
        super(String.format("password '%s' is wrong", msg));
        this.msg = msg;
    }
    public String getMsg() {
        return msg;
    }
}