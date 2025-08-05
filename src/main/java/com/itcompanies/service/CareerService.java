package com.itcompanies.service;

import com.itcompanies.entity.Career;
import com.itcompanies.repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class CareerService {
    
    @Autowired
    private CareerRepository careerRepository;
    
    // Get all active careers
    public List<Career> getAllActiveCareers() {
        return careerRepository.findByIsActiveTrue();
    }
    
    // Get all careers
    public List<Career> getAllCareers() {
        return careerRepository.findAll();
    }
    
    // Get career by ID
    public Optional<Career> getCareerById(Long id) {
        return careerRepository.findById(id);
    }
    
    // Create new career
    public Career createCareer(Career career) {
        career.setIsActive(true);
        career.setPostedDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        return careerRepository.save(career);
    }
    
    // Update career
    public Optional<Career> updateCareer(Long id, Career careerDetails) {
        return careerRepository.findById(id)
                .map(existingCareer -> {
                    existingCareer.setJobTitle(careerDetails.getJobTitle());
                    existingCareer.setCompanyName(careerDetails.getCompanyName());
                    existingCareer.setLocation(careerDetails.getLocation());
                    existingCareer.setJobType(careerDetails.getJobType());
                    existingCareer.setExperienceLevel(careerDetails.getExperienceLevel());
                    existingCareer.setDescription(careerDetails.getDescription());
                    existingCareer.setRequirements(careerDetails.getRequirements());
                    existingCareer.setSalaryRange(careerDetails.getSalaryRange());
                    existingCareer.setBenefits(careerDetails.getBenefits());
                    existingCareer.setApplicationDeadline(careerDetails.getApplicationDeadline());
                    existingCareer.setContactEmail(careerDetails.getContactEmail());
                    existingCareer.setApplicationUrl(careerDetails.getApplicationUrl());
                    return careerRepository.save(existingCareer);
                });
    }
    
    // Delete career (soft delete)
    public Optional<Career> deleteCareer(Long id) {
        return careerRepository.findById(id)
                .map(career -> {
                    career.setIsActive(false);
                    return careerRepository.save(career);
                });
    }
    
    // Search careers
    public List<Career> searchCareers(String keyword) {
        return careerRepository.searchCareers(keyword);
    }
    
    // Get careers by company
    public List<Career> getCareersByCompany(String companyName) {
        return careerRepository.findByCompanyNameAndIsActiveTrue(companyName);
    }
    
    // Get careers by job type
    public List<Career> getCareersByJobType(String jobType) {
        return careerRepository.findByJobType(jobType);
    }
    
    // Get careers by experience level
    public List<Career> getCareersByExperienceLevel(String experienceLevel) {
        return careerRepository.findByExperienceLevel(experienceLevel);
    }
    
    // Get careers by location
    public List<Career> getCareersByLocation(String location) {
        return careerRepository.findByLocationContainingIgnoreCase(location);
    }
    
    // Get all job types
    public List<String> getAllJobTypes() {
        return careerRepository.findAllJobTypes();
    }
    
    // Get all experience levels
    public List<String> getAllExperienceLevels() {
        return careerRepository.findAllExperienceLevels();
    }
    
    // Get all locations
    public List<String> getAllLocations() {
        return careerRepository.findAllLocations();
    }
}