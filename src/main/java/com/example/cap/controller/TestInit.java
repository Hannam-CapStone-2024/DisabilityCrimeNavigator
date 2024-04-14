package com.example.cap.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestInit {
    @GetMapping("/test")
    public String test() {
        return "Hello World!";
    }
}
