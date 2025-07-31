package com.Duubl.JobAppTracker.controller;

import com.Duubl.JobAppTracker.model.JobApplication;
import com.Duubl.JobAppTracker.model.User;
import com.Duubl.JobAppTracker.services.JobApplicationService;
import com.Duubl.JobAppTracker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;
    private final UserService userService;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService, UserService userService) {
        this.jobApplicationService = jobApplicationService;
        this.userService = userService;
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getUniqueCities() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> currentUserOpt = userService.findUserByUsername(authentication.getName());
        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        User currentUser = currentUserOpt.get();
        List<JobApplication> applications = jobApplicationService.getApplicationsForUser(currentUser.getId());
        List<String> cities = applications.stream()
                .map(JobApplication::getCity)
                .distinct()
                .filter(city -> city != null && !city.trim().isEmpty())
                .sorted()
                .collect(Collectors.toList());
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/states")
    public ResponseEntity<List<String>> getUniqueStates() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> currentUserOpt = userService.findUserByUsername(authentication.getName());
        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        User currentUser = currentUserOpt.get();
        List<JobApplication> applications = jobApplicationService.getApplicationsForUser(currentUser.getId());
        List<String> states = applications.stream()
                .map(JobApplication::getState)
                .distinct()
                .filter(state -> state != null && !state.trim().isEmpty())
                .sorted()
                .collect(Collectors.toList());
        return ResponseEntity.ok(states);
    }

    @GetMapping("/companies")
    public ResponseEntity<List<String>> getUniqueCompanies() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> currentUserOpt = userService.findUserByUsername(authentication.getName());
        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        User currentUser = currentUserOpt.get();
        List<JobApplication> applications = jobApplicationService.getApplicationsForUser(currentUser.getId());
        List<String> companies = applications.stream()
                .map(JobApplication::getCompanyName)
                .distinct()
                .filter(company -> company != null && !company.trim().isEmpty())
                .sorted()
                .collect(Collectors.toList());
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/user-applications")
    public ResponseEntity<List<JobApplication>> getUserApplications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> currentUserOpt = userService.findUserByUsername(authentication.getName());
        if (currentUserOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        User currentUser = currentUserOpt.get();
        List<JobApplication> applications = jobApplicationService.getApplicationsForUser(currentUser.getId());
        return ResponseEntity.ok(applications);
    }

    @PostMapping("/add")
    public ResponseEntity<JobApplication> addApplication(@RequestBody JobApplication application) {
        System.out.println("Received application data: " + application);
        System.out.println("Job title: " + application.getJobTitle());
        System.out.println("Company name: " + application.getCompanyName());
        System.out.println("Date applied: " + application.getDateApplied());
        System.out.println("City: " + application.getCity());
        System.out.println("State: " + application.getState());
        System.out.println("Is remote: " + application.isRemote());
        System.out.println("Status: " + application.getStatus());
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authentication: " + authentication.getName());
        
        Optional<User> currentUserOpt = userService.findUserByUsername(authentication.getName());
        if (currentUserOpt.isEmpty()) {
            System.out.println("User not found for username: " + authentication.getName());
            return ResponseEntity.badRequest().build();
        }
        User currentUser = currentUserOpt.get();
        System.out.println("Found user: " + currentUser.getUsername());
        
        application.setUser(currentUser);
        System.out.println("Application before save: " + application);
        
        JobApplication savedApplication = jobApplicationService.saveApplication(application);
        System.out.println("Saved application: " + savedApplication);
        
        return ResponseEntity.ok(savedApplication);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<JobApplication> updateApplication(@PathVariable Integer id, @RequestBody JobApplication application) {
        System.out.println("Updating application with ID: " + id);
        System.out.println("Received application data: " + application);
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> currentUserOpt = userService.findUserByUsername(authentication.getName());
        if (currentUserOpt.isEmpty()) {
            System.out.println("User not found for username: " + authentication.getName());
            return ResponseEntity.badRequest().build();
        }
        User currentUser = currentUserOpt.get();
        
        // Get the existing application
        Optional<JobApplication> existingApplicationOpt = jobApplicationService.getApplicationById(id);
        if (existingApplicationOpt.isEmpty()) {
            System.out.println("Application not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
        
        JobApplication existingApplication = existingApplicationOpt.get();
        
        // Verify the application belongs to the current user
        if (existingApplication.getUser().getId() != currentUser.getId()) {
            System.out.println("Application does not belong to current user");
            return ResponseEntity.status(403).build();
        }
        
        // Update the application fields
        existingApplication.setJobTitle(application.getJobTitle());
        existingApplication.setDescription(application.getDescription());
        existingApplication.setCompanyName(application.getCompanyName());
        existingApplication.setDateApplied(application.getDateApplied());
        existingApplication.setCity(application.getCity());
        existingApplication.setState(application.getState());
        existingApplication.setRemote(application.isRemote());
        existingApplication.setStatus(application.getStatus());
        
        System.out.println("Updated application: " + existingApplication);
        
        JobApplication updatedApplication = jobApplicationService.saveApplication(existingApplication);
        return ResponseEntity.ok(updatedApplication);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> currentUserOpt = userService.findUserByUsername(authentication.getName());
        if (currentUserOpt.isEmpty()) {
            System.out.println("User not found for username: " + authentication.getName());
            return ResponseEntity.badRequest().build();
        }
        User currentUser = currentUserOpt.get();
        
        // Get the existing application
        Optional<JobApplication> existingApplicationOpt = jobApplicationService.getApplicationById(id);
        if (existingApplicationOpt.isEmpty()) {
            System.out.println("Application not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
        
        JobApplication existingApplication = existingApplicationOpt.get();
        
        // Verify the application belongs to the current user
        if (existingApplication.getUser().getId() != currentUser.getId()) {
            System.out.println("Application does not belong to current user");
            return ResponseEntity.status(403).build();
        }

        jobApplicationService.deleteApplication(existingApplication.getId());
        return ResponseEntity.ok().build();
    }
} 