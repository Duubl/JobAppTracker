package com.Duubl.JobAppTracker.model;


import java.time.LocalDate;

import org.apache.tomcat.util.net.openssl.ciphers.Encryption;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.ForeignKey;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        referencedColumnName = "id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_jobapplication_user")
    )
    private User user;

    @Column(name = "job_title", nullable = false, length = 255)
    private String job_title;

    @Column(name = "job_description", length = 2000)
    private String description;

    @Column(name = "company_name", length = 255)
    private String company_name;

    @Column(name = "date_applied", nullable = false)
    private LocalDate date_applied;

    @Column(name = "company_location", nullable = false)
    private CityState company_location;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_status")
    private ApplicationStatus status;

    public JobApplication(int id, User user, String job_title, String description, String company_name, ApplicationStatus status, LocalDate date_applied, CityState company_location) {
        this.id = id;
        this.user = user;
        this.job_title = job_title;
        this.description = description;
        this.company_name = company_name;
        this.status = status;
        this.date_applied = date_applied;
        this.company_location = company_location;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getJobTitle() { return job_title; }
    public void setJobTitle(String job_title) { this.job_title = job_title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCompanyName() { return company_name; }
    public void setCompanyName(String company_name) { this.company_name = company_name; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public LocalDate getDateApplied() { return date_applied; }
    public void setDateApplied(LocalDate date_applied) { this.date_applied = date_applied; }
    public CityState getCompanyLocation() { return company_location; }
    public void setCompanyLocation(CityState company_location) { this.company_location = company_location; }
}
