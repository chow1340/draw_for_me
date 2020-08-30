package com.example.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HelloController {

//    @Value("${db.password}")
//    private String password;

    @RequestMapping("/")
    public String index(){
        return "Greetingss";
    }
}
