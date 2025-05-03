package com.Duubl.JobAppTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Duubl.JobAppTracker.model.ApplicationStatus;
import com.Duubl.JobAppTracker.model.JobApplication;
import com.Duubl.JobAppTracker.model.User;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {
    List<JobApplication> findByUser(User user);
    List<JobApplication> findByUserId(int user_id);
    List<JobApplication> findByStatus(ApplicationStatus status);
    List<JobApplication> findByUserAndStatus(User user, ApplicationStatus status);
    List<JobApplication> findByUserIdAndStatus(int userId, ApplicationStatus status);
    List<JobApplication> findByCompanyNameIgnoreCase(String companyName);
}
