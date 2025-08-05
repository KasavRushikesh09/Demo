package com.itcompanies.repository;

import com.itcompanies.entity.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
    
    List<Career> findByIsActiveTrue();
    
    List<Career> findByCompanyName(String companyName);
    
    List<Career> findByJobType(String jobType);
    
    List<Career> findByExperienceLevel(String experienceLevel);
    
    List<Career> findByLocationContainingIgnoreCase(String location);
    
    @Query("SELECT c FROM Career c WHERE c.jobTitle LIKE %:keyword% OR c.description LIKE %:keyword% OR c.companyName LIKE %:keyword%")
    List<Career> searchCareers(@Param("keyword") String keyword);
    
    List<Career> findByCompanyNameAndIsActiveTrue(String companyName);
    
    @Query("SELECT DISTINCT c.jobType FROM Career c WHERE c.isActive = true")
    List<String> findAllJobTypes();
    
    @Query("SELECT DISTINCT c.experienceLevel FROM Career c WHERE c.isActive = true")
    List<String> findAllExperienceLevels();
    
    @Query("SELECT DISTINCT c.location FROM Career c WHERE c.isActive = true")
    List<String> findAllLocations();
}