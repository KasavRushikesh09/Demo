package com.itcompanies.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "companies")
public class Company {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 100, message = "Company name must be between 2 and 100 characters")
    @Column(name = "name", nullable = false)
    private String name;
    
    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(name = "description", nullable = false)
    private String description;
    
    @NotBlank(message = "Industry is required")
    @Column(name = "industry", nullable = false)
    private String industry;
    
    @NotBlank(message = "Headquarters location is required")
    @Column(name = "headquarters", nullable = false)
    private String headquarters;
    
    @NotNull(message = "Founded year is required")
    @Column(name = "founded_year", nullable = false)
    private Integer foundedYear;
    
    @Column(name = "employee_count")
    private String employeeCount;
    
    @Column(name = "website")
    private String website;
    
    @Column(name = "logo_url")
    private String logoUrl;
    
    @Column(name = "revenue")
    private String revenue;
    
    @Column(name = "ceo")
    private String ceo;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // Constructors
    public Company() {}
    
    public Company(String name, String description, String industry, String headquarters, 
                   Integer foundedYear, String employeeCount, String website, String logoUrl, 
                   String revenue, String ceo) {
        this.name = name;
        this.description = description;
        this.industry = industry;
        this.headquarters = headquarters;
        this.foundedYear = foundedYear;
        this.employeeCount = employeeCount;
        this.website = website;
        this.logoUrl = logoUrl;
        this.revenue = revenue;
        this.ceo = ceo;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getIndustry() {
        return industry;
    }
    
    public void setIndustry(String industry) {
        this.industry = industry;
    }
    
    public String getHeadquarters() {
        return headquarters;
    }
    
    public void setHeadquarters(String headquarters) {
        this.headquarters = headquarters;
    }
    
    public Integer getFoundedYear() {
        return foundedYear;
    }
    
    public void setFoundedYear(Integer foundedYear) {
        this.foundedYear = foundedYear;
    }
    
    public String getEmployeeCount() {
        return employeeCount;
    }
    
    public void setEmployeeCount(String employeeCount) {
        this.employeeCount = employeeCount;
    }
    
    public String getWebsite() {
        return website;
    }
    
    public void setWebsite(String website) {
        this.website = website;
    }
    
    public String getLogoUrl() {
        return logoUrl;
    }
    
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
    
    public String getRevenue() {
        return revenue;
    }
    
    public void setRevenue(String revenue) {
        this.revenue = revenue;
    }
    
    public String getCeo() {
        return ceo;
    }
    
    public void setCeo(String ceo) {
        this.ceo = ceo;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}