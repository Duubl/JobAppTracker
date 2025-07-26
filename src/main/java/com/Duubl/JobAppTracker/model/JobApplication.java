package com.Duubl.JobAppTracker.model;


import java.time.LocalDate;

import org.apache.tomcat.util.net.openssl.ciphers.Encryption;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("job_title")
    private String job_title;

    @Column(name = "job_description", length = 2000)
    @JsonProperty("description")
    private String description;

    @Column(name = "company_name", length = 255)
    @JsonProperty("company_name")
    private String company_name;

    @Column(name = "date_applied", nullable = false)
    @JsonProperty("date_applied")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_applied;

    @Column(name = "city", nullable = false, length = 255)
    @JsonProperty("city")
    private String city;

    @Column(name = "state", nullable = false, length = 255)
    @JsonProperty("state")
    private String state;

    @Column(name = "is_remote", nullable = false)
    @JsonProperty("isRemote")
    private boolean isRemote;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_status")
    @JsonProperty("status")
    private ApplicationStatus status;

    // Default constructor for JPA and JSON deserialization
    public JobApplication() {
    }

    public JobApplication(int id, User user, String job_title, String description, String company_name, ApplicationStatus status, LocalDate date_applied, String city, String state, boolean isRemote) {
        this.id = id;
        this.user = user;
        this.job_title = job_title;
        this.description = description;
        this.company_name = company_name;
        this.status = status;
        this.date_applied = date_applied;
        this.city = city;
        this.state = state;
        this.isRemote = isRemote;
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
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public boolean isRemote() { return isRemote; }
    public void setRemote(boolean isRemote) { this.isRemote = isRemote; }

    @Override
    public String toString() {
        return "JobApplication{" +
                "id=" + id +
                ", job_title='" + job_title + '\'' +
                ", company_name='" + company_name + '\'' +
                ", date_applied=" + date_applied +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", isRemote=" + isRemote +
                ", status=" + status +
                '}';
    }
}
