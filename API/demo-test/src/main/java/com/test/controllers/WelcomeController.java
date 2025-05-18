package com.test.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/test")
public class WelcomeController {

  @GetMapping
  public String welcome() {
    return "Welcome to Spring Boot Rest API";
  }

}
