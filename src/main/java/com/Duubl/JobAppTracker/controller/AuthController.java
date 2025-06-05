package com.Duubl.JobAppTracker.controller;

import com.Duubl.JobAppTracker.dto.ErrorResponse;
import com.Duubl.JobAppTracker.dto.LoginRequest;
import com.Duubl.JobAppTracker.dto.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api") // Base path for API endpoints
public class AuthController {

    // --- VERY INSECURE - FOR DEMO ONLY ---
    private final String HARDCODED_USERNAME = "user";
    private final String HARDCODED_PASS = "password";
    // --- Replace with actual authentication logic using Spring Security ---

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        System.out.println("Login attempt for username: " + loginRequest.getUsername()); // Log attempt

        // --- !!! Replace this check with Spring Security or proper validation !!! ---
        if (HARDCODED_USERNAME.equals(loginRequest.getUsername()) && HARDCODED_PASS.equals(loginRequest.getPassword())) {
            
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
}
