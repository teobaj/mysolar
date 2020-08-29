package com.teobaj.mysolar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class WrongKeyException extends RuntimeException {
    private String msg;

    public WrongKeyException(String msg){
        super(String.format("api key '%s' is wrong", msg));
        this.msg = msg;
    }
    public String getMsg() {
        return msg;
    }
}