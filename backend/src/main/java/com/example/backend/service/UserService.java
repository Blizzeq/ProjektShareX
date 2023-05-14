package com.example.backend.service;

import com.example.backend.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User saveUser(User user);

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    List<String> usernameList(Long userId);

    User getLoggedInUser(Authentication authentication);

}
