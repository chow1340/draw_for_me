package com.example.api.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/user")
public class UserProfileController {

    @GetMapping("/general")
    public String generalProfileInfo(@CookieValue("accessToken") String cookieValue){
        return cookieValue;
    }
}
