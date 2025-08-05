package com.itcompanies.repository;

import com.itcompanies.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    
    List<Company> findByNameContainingIgnoreCase(String name);
    
    List<Company> findByIndustryIgnoreCase(String industry);
    
    List<Company> findByLocationContainingIgnoreCase(String location);
    
    @Query("SELECT DISTINCT c.industry FROM Company c ORDER BY c.industry")
    List<String> findDistinctIndustries();
    
    @Query("SELECT c FROM Company c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.industry) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Company> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT c FROM Company c WHERE c.foundedYear BETWEEN :startYear AND :endYear")
    List<Company> findByFoundedYearBetween(@Param("startYear") Integer startYear, @Param("endYear") Integer endYear);
}