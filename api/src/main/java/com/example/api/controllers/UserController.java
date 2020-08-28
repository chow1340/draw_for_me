package com.example.api.controllers;

import com.example.api.enumerations.LogInResult;
import com.example.api.enumerations.RegisterResult;
import com.example.api.objects.UserDTO;
import com.example.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@Controller
@RequestMapping(path="/api/user")
public class UserController {
    private ApplicationContext context;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Object> registerUserPost (
            @RequestBody UserDTO registerPost
    ) {
        RegisterResult result = userService.registerNewUser(registerPost);
        if(result == RegisterResult.REGISTER_SUCCESS) {
            return new ResponseEntity<>("User has been saved", HttpStatus.CREATED);
        }
        switch(result) {
            case EMAIL_EXISTS:
                return new ResponseEntity<>("Email already exists", HttpStatus.CREATED);
            case REGISTER_SUCCESS:
                return new ResponseEntity<>("User has been saved", HttpStatus.CREATED);
            default:
                return new ResponseEntity<>("Registration Error", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/logIn" ,method = RequestMethod.POST)
    public ResponseEntity<Object> logInUserPost(@RequestBody UserDTO userDTO, HttpServletRequest req) {
        LogInResult result = userService.logInUser(userDTO, req);
        switch(result){
            case USER_DOES_NOT_EXIST:
                return new ResponseEntity<>("User does not exists", HttpStatus.CREATED);
            case PASSWORD_DO_NOT_MATCH:
                return new ResponseEntity<>("Passwords do not match", HttpStatus.CREATED);
            default:
                return new ResponseEntity<>("Log in successful", HttpStatus.CREATED);

        }
    }


}