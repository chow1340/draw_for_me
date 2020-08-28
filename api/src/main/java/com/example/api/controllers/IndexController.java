package com.example.api.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Controller
public class IndexController {

    @RequestMapping(value="/" , method=RequestMethod.GET)
    public void home(HttpServletRequest req){
        System.out.println("ran");
        req.getSession().setAttribute("testSess", "testVal");
        List<String> msgs = (List<String>) req.getSession().getAttribute("testSess");
    }
}
