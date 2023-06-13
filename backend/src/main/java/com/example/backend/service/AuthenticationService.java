package com.example.backend.service;

import com.example.backend.model.User;

public interface AuthenticationService {

    User signInAndReturnJWT(User signInRequest);

}
