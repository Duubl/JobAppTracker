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
} 