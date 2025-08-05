package com.itcompanies.controller;

import com.itcompanies.model.JobListing;
import com.itcompanies.model.JobListing.JobType;
import com.itcompanies.model.JobListing.ExperienceLevel;
import com.itcompanies.service.JobListingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobListingController {
    
    @Autowired
    private JobListingService jobListingService;
    
    @GetMapping
    public ResponseEntity<List<JobListing>> getAllActiveJobs() {
        List<JobListing> jobs = jobListingService.getAllActiveJobs();
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobListing> getJobById(@PathVariable Long id) {
        Optional<JobListing> job = jobListingService.getJobById(id);
        return job.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<JobListing> createJob(@Valid @RequestBody JobListing jobListing) {
        try {
            JobListing savedJob = jobListingService.saveJob(jobListing);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobListing> updateJob(@PathVariable Long id, 
                                              @Valid @RequestBody JobListing jobListing) {
        try {
            JobListing updatedJob = jobListingService.updateJob(id, jobListing);
            return ResponseEntity.ok(updatedJob);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        try {
            jobListingService.deleteJob(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateJob(@PathVariable Long id) {
        try {
            jobListingService.deactivateJob(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<JobListing>> getJobsByCompany(@PathVariable Long companyId) {
        List<JobListing> jobs = jobListingService.getJobsByCompany(companyId);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<JobListing>> searchJobs(@RequestParam String keyword) {
        List<JobListing> jobs = jobListingService.searchJobs(keyword);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/by-type")
    public ResponseEntity<List<JobListing>> getJobsByType(@RequestParam JobType jobType) {
        List<JobListing> jobs = jobListingService.getJobsByType(jobType);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/by-experience")
    public ResponseEntity<List<JobListing>> getJobsByExperience(@RequestParam ExperienceLevel level) {
        List<JobListing> jobs = jobListingService.getJobsByExperienceLevel(level);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/by-location")
    public ResponseEntity<List<JobListing>> getJobsByLocation(@RequestParam String location) {
        List<JobListing> jobs = jobListingService.getJobsByLocation(location);
        return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getActiveJobsCount() {
        long count = jobListingService.countActiveJobs();
        return ResponseEntity.ok(count);
    }
}