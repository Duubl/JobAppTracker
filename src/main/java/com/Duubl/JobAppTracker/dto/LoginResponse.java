package com.Duubl.JobAppTracker.dto;

public class LoginResponse {
    private String message;
    private String username;

    public LoginResponse(String message, String username) {
        this.message = message;
        this.username = username;
    }
     public LoginResponse(String message) {
        this.message = message;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
