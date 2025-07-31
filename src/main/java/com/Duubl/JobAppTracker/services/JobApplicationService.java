package com.Duubl.JobAppTracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Duubl.JobAppTracker.model.JobApplication;
import com.Duubl.JobAppTracker.repository.JobApplicationRepository;

@Service
public class JobApplicationService {
        private final JobApplicationRepository job_app_repo;

        @Autowired
        public JobApplicationService(JobApplicationRepository job_app_repo) {
            this.job_app_repo = job_app_repo;
        }

        public List<JobApplication> getApplicationsForUser(int userId) {
            return job_app_repo.findByUserId(userId);
        }

        public JobApplication saveApplication(JobApplication application) {
            return job_app_repo.save(application);
        }

        public List<JobApplication> getAllApplications() {
            return job_app_repo.findAll();
        }

        public Optional<JobApplication> getApplicationById(Integer id) {
            return job_app_repo.findById(id);
        }

        public void deleteApplication(Integer id) {
            job_app_repo.deleteById(id);
        }
}
