package com.itcompanies.repository;

import com.itcompanies.model.JobListing;
import com.itcompanies.model.JobListing.JobType;
import com.itcompanies.model.JobListing.ExperienceLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobListingRepository extends JpaRepository<JobListing, Long> {
    
    List<JobListing> findByActiveTrue();
    
    List<JobListing> findByCompanyIdAndActiveTrue(Long companyId);
    
    List<JobListing> findByJobTypeAndActiveTrue(JobType jobType);
    
    List<JobListing> findByExperienceLevelAndActiveTrue(ExperienceLevel experienceLevel);
    
    List<JobListing> findByLocationContainingIgnoreCaseAndActiveTrue(String location);
    
    @Query("SELECT j FROM JobListing j WHERE j.active = true AND " +
           "(LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<JobListing> searchActiveJobsByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT j FROM JobListing j WHERE j.company.id = :companyId AND j.active = true")
    List<JobListing> findActiveJobsByCompanyId(@Param("companyId") Long companyId);
}