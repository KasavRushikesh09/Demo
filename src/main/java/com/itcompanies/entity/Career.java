package com.itcompanies.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "careers")
public class Career {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Job title is required")
    @Size(min = 2, max = 100, message = "Job title must be between 2 and 100 characters")
    @Column(name = "job_title", nullable = false)
    private String jobTitle;
    
    @NotBlank(message = "Company name is required")
    @Column(name = "company_name", nullable = false)
    private String companyName;
    
    @NotBlank(message = "Location is required")
    @Column(name = "location", nullable = false)
    private String location;
    
    @NotBlank(message = "Job type is required")
    @Column(name = "job_type", nullable = false)
    private String jobType; // Full-time, Part-time, Contract, Internship
    
    @NotBlank(message = "Experience level is required")
    @Column(name = "experience_level", nullable = false)
    private String experienceLevel; // Entry, Mid, Senior, Executive
    
    @NotBlank(message = "Description is required")
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(name = "description", nullable = false)
    private String description;
    
    @Column(name = "requirements")
    private String requirements;
    
    @Column(name = "salary_range")
    private String salaryRange;
    
    @Column(name = "benefits")
    private String benefits;
    
    @Column(name = "application_deadline")
    private String applicationDeadline;
    
    @Column(name = "contact_email")
    private String contactEmail;
    
    @Column(name = "application_url")
    private String applicationUrl;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "posted_date")
    private String postedDate;
    
    // Constructors
    public Career() {}
    
    public Career(String jobTitle, String companyName, String location, String jobType, 
                  String experienceLevel, String description, String requirements, 
                  String salaryRange, String benefits, String applicationDeadline, 
                  String contactEmail, String applicationUrl) {
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.location = location;
        this.jobType = jobType;
        this.experienceLevel = experienceLevel;
        this.description = description;
        this.requirements = requirements;
        this.salaryRange = salaryRange;
        this.benefits = benefits;
        this.applicationDeadline = applicationDeadline;
        this.contactEmail = contactEmail;
        this.applicationUrl = applicationUrl;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getJobTitle() {
        return jobTitle;
    }
    
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }
    
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public String getJobType() {
        return jobType;
    }
    
    public void setJobType(String jobType) {
        this.jobType = jobType;
    }
    
    public String getExperienceLevel() {
        return experienceLevel;
    }
    
    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getRequirements() {
        return requirements;
    }
    
    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }
    
    public String getSalaryRange() {
        return salaryRange;
    }
    
    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }
    
    public String getBenefits() {
        return benefits;
    }
    
    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }
    
    public String getApplicationDeadline() {
        return applicationDeadline;
    }
    
    public void setApplicationDeadline(String applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }
    
    public String getContactEmail() {
        return contactEmail;
    }
    
    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }
    
    public String getApplicationUrl() {
        return applicationUrl;
    }
    
    public void setApplicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public String getPostedDate() {
        return postedDate;
    }
    
    public void setPostedDate(String postedDate) {
        this.postedDate = postedDate;
    }
}