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

    public Optional<User> findUserByUsername(String username) {
        return user_repo.findByUsername(username);
    }

    public User createUser(String username, String encodedPassword, String role) {
        User user = new User(username, encodedPassword, role);
        return user_repo.save(user);
    }

    public User createUser(User user) {
        return user_repo.save(user);
    }

    public boolean userExists(String username) {
        return user_repo.findByUsername(username).isPresent();
    }
}
