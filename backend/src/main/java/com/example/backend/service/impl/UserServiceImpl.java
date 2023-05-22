package com.example.backend.service.impl;

import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final EntityManager entityManager;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, EntityManager entityManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.entityManager = entityManager;
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setCreatedTime(LocalDateTime.now());
        user.setActive(true);

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<String> usernameList(Long userId) {
        return userRepository.findUsernameList(userId);
    }

    @Override
    public List<User> findUnassignedUsers(Long projectId) {
        String query = "SELECT * FROM users WHERE id NOT IN " +
                "(SELECT user_id FROM users_projects WHERE project_id = :projectId)";

        Query nativeQuery = entityManager.createNativeQuery(query, User.class);
        nativeQuery.setParameter("projectId", projectId);

        return nativeQuery.getResultList();
    }

    @Override
    public List<User> findAssignedUsers(Long projectId) {
        String query = "SELECT * FROM users WHERE id IN " +
                "(SELECT user_id FROM users_projects WHERE project_id = :projectId)";

        Query nativeQuery = entityManager.createNativeQuery(query, User.class);
        nativeQuery.setParameter("projectId", projectId);

        return nativeQuery.getResultList();
    }

    @Override
    public User getLoggedInUser(Authentication authentication) {
        String loggedInUsername = authentication.getName();
        Optional<User> optionalUser = userRepository.findByUsername(loggedInUsername);
        return optionalUser.orElse(null);
    }
}
