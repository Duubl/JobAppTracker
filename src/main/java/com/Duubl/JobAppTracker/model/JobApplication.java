package com.Duubl.JobAppTracker.model;

public class JobApplication {
    private int id;
    private String job_title;
    private String description;
    private String company_name;
    private ApplicationStatus status;

    public JobApplication(int id, String job_title, String description, String company_name, ApplicationStatus status) {
        this.id = id;
        this.job_title = job_title;
        this.description = description;
        this.company_name = company_name;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getJobTitle() {
        return job_title;
    }

    public void setJobTitle(String job_title) {
        this.job_title = job_title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCompanyName() {
        return company_name;
    }

    public void setCompanyName(String company_name) {
        this.company_name = company_name;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}
