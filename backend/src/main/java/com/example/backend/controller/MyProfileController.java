package com.example.backend.controller;

import com.example.backend.exception.UserNotFoundException;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.UserPrinciple;
import com.example.backend.security.jwt.JwtProvider;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/profile")
public class MyProfileController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getLoggedInUser(Authentication authentication) {
        User user = userService.getLoggedInUser(authentication);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("user/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setFirstName(newUser.getFirstName());
                    user.setLastName(newUser.getLastName());
                    user.setPassword(passwordEncoder.encode(newUser.getPassword()));

                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }
}
