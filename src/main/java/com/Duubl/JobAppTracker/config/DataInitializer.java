package com.Duubl.JobAppTracker.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.Duubl.JobAppTracker.model.User;
import com.Duubl.JobAppTracker.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create initial users if they don't exist
        if (!userRepository.findByUsername("user").isPresent()) {
            User user = new User("user", passwordEncoder.encode("password"), "USER");
            userRepository.save(user);
        }
        
        if (!userRepository.findByUsername("admin").isPresent()) {
            User admin = new User("admin", passwordEncoder.encode("password"), "ADMIN");
            userRepository.save(admin);
        }
    }
} 