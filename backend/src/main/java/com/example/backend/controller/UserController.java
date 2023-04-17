package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserController {

//    @Autowired
//    private UserRepository userRepository;
//
//    @PostMapping("/ProjektShareX")
//    public ResponseEntity<String> login(@RequestBody User user) {
//        String email = user.getEmail();
//        String password = user.getPassword();
//
//        System.out.println(email + " " + password);
//
//        return ResponseEntity.ok("Zalogowano pomyślnie");
//    }

}
