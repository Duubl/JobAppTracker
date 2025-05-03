package com.Duubl.JobAppTracker.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Duubl.JobAppTracker.model.User;
import com.Duubl.JobAppTracker.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository user_repo;
    
    @Autowired
    public UserService(UserRepository user_repo) {
        this.user_repo = user_repo;
    }

    public Optional<User> findUserByEmail(String email) {
        return user_repo.findByEmail(email);
    }
}
