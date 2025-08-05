package com.itcompanies.repository;

import com.itcompanies.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    
    List<Company> findByIsActiveTrue();
    
    List<Company> findByIndustry(String industry);
    
    List<Company> findByHeadquartersContainingIgnoreCase(String location);
    
    @Query("SELECT c FROM Company c WHERE c.name LIKE %:keyword% OR c.description LIKE %:keyword% OR c.industry LIKE %:keyword%")
    List<Company> searchCompanies(@Param("keyword") String keyword);
    
    List<Company> findByFoundedYearBetween(Integer startYear, Integer endYear);
    
    @Query("SELECT DISTINCT c.industry FROM Company c WHERE c.isActive = true")
    List<String> findAllIndustries();
    
    @Query("SELECT DISTINCT c.headquarters FROM Company c WHERE c.isActive = true")
    List<String> findAllLocations();
}