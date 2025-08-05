package com.itcompanies.service;

import com.itcompanies.model.JobListing;
import com.itcompanies.model.JobListing.JobType;
import com.itcompanies.model.JobListing.ExperienceLevel;
import com.itcompanies.repository.JobListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class JobListingService {
    
    @Autowired
    private JobListingRepository jobListingRepository;
    
    public List<JobListing> getAllActiveJobs() {
        return jobListingRepository.findByActiveTrue();
    }
    
    public Optional<JobListing> getJobById(Long id) {
        return jobListingRepository.findById(id);
    }
    
    public JobListing saveJob(JobListing jobListing) {
        return jobListingRepository.save(jobListing);
    }
    
    public JobListing updateJob(Long id, JobListing updatedJob) {
        return jobListingRepository.findById(id)
                .map(job -> {
                    job.setTitle(updatedJob.getTitle());
                    job.setDescription(updatedJob.getDescription());
                    job.setLocation(updatedJob.getLocation());
                    job.setJobType(updatedJob.getJobType());
                    job.setExperienceLevel(updatedJob.getExperienceLevel());
                    job.setSalaryRange(updatedJob.getSalaryRange());
                    job.setRequiredSkills(updatedJob.getRequiredSkills());
                    job.setBenefits(updatedJob.getBenefits());
                    job.setApplicationDeadline(updatedJob.getApplicationDeadline());
                    job.setActive(updatedJob.isActive());
                    return jobListingRepository.save(job);
                })
                .orElseThrow(() -> new RuntimeException("Job listing not found with id: " + id));
    }
    
    public void deleteJob(Long id) {
        jobListingRepository.deleteById(id);
    }
    
    public void deactivateJob(Long id) {
        jobListingRepository.findById(id)
                .ifPresent(job -> {
                    job.setActive(false);
                    jobListingRepository.save(job);
                });
    }
    
    public List<JobListing> getJobsByCompany(Long companyId) {
        return jobListingRepository.findActiveJobsByCompanyId(companyId);
    }
    
    public List<JobListing> getJobsByType(JobType jobType) {
        return jobListingRepository.findByJobTypeAndActiveTrue(jobType);
    }
    
    public List<JobListing> getJobsByExperienceLevel(ExperienceLevel experienceLevel) {
        return jobListingRepository.findByExperienceLevelAndActiveTrue(experienceLevel);
    }
    
    public List<JobListing> getJobsByLocation(String location) {
        return jobListingRepository.findByLocationContainingIgnoreCaseAndActiveTrue(location);
    }
    
    public List<JobListing> searchJobs(String keyword) {
        return jobListingRepository.searchActiveJobsByKeyword(keyword);
    }
    
    public long countActiveJobs() {
        return jobListingRepository.findByActiveTrue().size();
    }
}