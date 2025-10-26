package com.Duubl.JobAppTracker.controller;

import com.Duubl.JobAppTracker.dto.ErrorResponse;
import com.Duubl.JobAppTracker.dto.LoginRequest;
import com.Duubl.JobAppTracker.dto.LoginResponse;
import com.Duubl.JobAppTracker.dto.RegisterRequest;
import com.Duubl.JobAppTracker.dto.RegisterResponse;
import com.Duubl.JobAppTracker.model.User;
import com.Duubl.JobAppTracker.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api") // Base path for API endpoints
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // --- Replace with actual authentication logic using Spring Security ---

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        System.out.println("Login attempt for username: " + loginRequest.getUsername()); // Log attempt

        // --- !!! Replace this check with Spring Security or proper validation !!! ---
        if (userService.findUserByUsername(loginRequest.getUsername()).isPresent() 
        && passwordEncoder.matches(loginRequest.getPassword(), 
        userService.findUserByUsername(loginRequest.getUsername()).get().getPassword())) {
            
            // Successful login
            System.out.println("Login successful for username: " + loginRequest.getUsername());

            // In a real app, you would generate a session or JWT token here
            LoginResponse response = new LoginResponse("Login Successful", loginRequest.getUsername());
            return ResponseEntity.ok(response);
        } else {

            // Failed login
            System.out.println("Login failed for username: " + loginRequest.getUsername());
             ErrorResponse errorResponse = new ErrorResponse("Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse); // 401 Unauthorized
        }
    }

    @GetMapping("/auth/status")
    public ResponseEntity<?> getAuthStatus() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        Map<String, Object> response = new HashMap<>();
        
        if (authentication != null && authentication.isAuthenticated() && 
            !"anonymousUser".equals(authentication.getName())) {
            response.put("authenticated", true);
            response.put("username", authentication.getName());
            response.put("authorities", authentication.getAuthorities());
            return ResponseEntity.ok(response);
        } else {
            response.put("authenticated", false);
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Register attempt for username: " + registerRequest.getUsername());
        if (userService.findUserByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Username already exists"));
        }
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        User user = new User(registerRequest.getUsername(), encodedPassword, "ROLE_USER");
        userService.createUser(user);
        return ResponseEntity.ok(new RegisterResponse("Registration successful for user ", registerRequest.getUsername()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Spring Security handles the logout automatically
        // This endpoint is just for the frontend to call
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }
}
