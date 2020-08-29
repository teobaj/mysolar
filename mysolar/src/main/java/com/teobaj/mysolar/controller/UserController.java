package com.teobaj.mysolar.controller;

import java.util.Base64;

import javax.validation.Valid;

import com.teobaj.mysolar.exception.ResourceAlreadyExists;
import com.teobaj.mysolar.exception.ResourceNotFoundException;
import com.teobaj.mysolar.exception.WrongKeyException;
import com.teobaj.mysolar.exception.WrongPasswordExcepetion;
import com.teobaj.mysolar.model.User;
import com.teobaj.mysolar.repository.UserRepository;
import org.apache.commons.lang.RandomStringUtils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/signup")
    public User signUp(@Valid @RequestBody User user){

        User aeUser = userRepository.findByEmail(user.getEmail());
        //Encode Password        
        String encryptedPassword = Base64.getEncoder().encodeToString(user.getPassword().getBytes());
        
        //Generate API KEY
        String generatedApiKey = RandomStringUtils.randomAlphanumeric(10);
        
        user.setApiKey(generatedApiKey);
        user.setPassword(encryptedPassword);
        
        // return userRepository.save(user);
        if(aeUser != null){
            throw new ResourceAlreadyExists("User","email",user.getEmail());
        }
        return userRepository.save(user);
            

    }

    @PostMapping("/login")
    public User login(@Valid @RequestBody User user){
        User cUser = userRepository.findByEmail(user.getEmail());
        if(cUser == null){
            throw new ResourceNotFoundException("User", "email", user.getEmail());
        }
        String userPassword = Base64.getEncoder().encodeToString(user.getPassword().getBytes());
        if(!userPassword.equals(cUser.getPassword())){
            throw new WrongPasswordExcepetion(user.getPassword());
        }
        return cUser; 
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable(value = "id") Long id, @RequestHeader("apiKey") String apiKey){   

        User u = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user", "id", id));
        if(u.getApiKey().equals(apiKey)){
            return u;
        }else{
            throw new WrongKeyException("Wrong API KEY");
        }
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long id, @RequestHeader("apiKey") String apiKey){
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user", "id", id));
        if(user.getApiKey().equals(apiKey)){
            userRepository.delete(user);
            return ResponseEntity.ok().build();
        }else{
            throw new WrongKeyException("Wrong API KEY");
        }
    }

    @PostMapping("/user/{id}")
    public User updatUser(@PathVariable(value = "id") Long id,  @RequestHeader("apiKey") String apiKey, @Valid @RequestBody User userUpdated) {
        
        User oldUser = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user", "id", id));
        if(oldUser.getApiKey().equals(apiKey)){

            oldUser.setEmail(userUpdated.getEmail());
            oldUser.setPanels(userUpdated.getPanels());
            String encryptedPassword = Base64.getEncoder().encodeToString(userUpdated.getPassword().getBytes());
            oldUser.setPassword(encryptedPassword);
        }

        User newUser = userRepository.save(oldUser);

        return newUser;
    }
    


}