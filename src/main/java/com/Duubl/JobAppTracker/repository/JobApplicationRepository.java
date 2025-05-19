package com.Duubl.JobAppTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Duubl.JobAppTracker.model.ApplicationStatus;
import com.Duubl.JobAppTracker.model.JobApplication;
import com.Duubl.JobAppTracker.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {
    List<JobApplication> findByUser(User user);
    List<JobApplication> findByUserId(int user_id);
    List<JobApplication> findByStatus(ApplicationStatus status);
    List<JobApplication> findByUserAndStatus(User user, ApplicationStatus status);
    List<JobApplication> findByUserIdAndStatus(int userId, ApplicationStatus status);
    @Query("SELECT j FROM JobApplication j WHERE LOWER(j.company_name) = LOWER(:companyName)")
    List<JobApplication> findByCompanyNameIgnoreCase(@Param("companyName") String companyName);
}
