package com.itcompanies.service;

import com.itcompanies.entity.Company;
import com.itcompanies.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    
    @Autowired
    private CompanyRepository companyRepository;
    
    // Get all active companies
    public List<Company> getAllActiveCompanies() {
        return companyRepository.findByIsActiveTrue();
    }
    
    // Get all companies
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
    
    // Get company by ID
    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }
    
    // Create new company
    public Company createCompany(Company company) {
        company.setIsActive(true);
        return companyRepository.save(company);
    }
    
    // Update company
    public Optional<Company> updateCompany(Long id, Company companyDetails) {
        return companyRepository.findById(id)
                .map(existingCompany -> {
                    existingCompany.setName(companyDetails.getName());
                    existingCompany.setDescription(companyDetails.getDescription());
                    existingCompany.setIndustry(companyDetails.getIndustry());
                    existingCompany.setHeadquarters(companyDetails.getHeadquarters());
                    existingCompany.setFoundedYear(companyDetails.getFoundedYear());
                    existingCompany.setEmployeeCount(companyDetails.getEmployeeCount());
                    existingCompany.setWebsite(companyDetails.getWebsite());
                    existingCompany.setLogoUrl(companyDetails.getLogoUrl());
                    existingCompany.setRevenue(companyDetails.getRevenue());
                    existingCompany.setCeo(companyDetails.getCeo());
                    return companyRepository.save(existingCompany);
                });
    }
    
    // Delete company (soft delete)
    public Optional<Company> deleteCompany(Long id) {
        return companyRepository.findById(id)
                .map(company -> {
                    company.setIsActive(false);
                    return companyRepository.save(company);
                });
    }
    
    // Search companies
    public List<Company> searchCompanies(String keyword) {
        return companyRepository.searchCompanies(keyword);
    }
    
    // Get companies by industry
    public List<Company> getCompaniesByIndustry(String industry) {
        return companyRepository.findByIndustry(industry);
    }
    
    // Get companies by location
    public List<Company> getCompaniesByLocation(String location) {
        return companyRepository.findByHeadquartersContainingIgnoreCase(location);
    }
    
    // Get companies by founded year range
    public List<Company> getCompaniesByFoundedYearRange(Integer startYear, Integer endYear) {
        return companyRepository.findByFoundedYearBetween(startYear, endYear);
    }
    
    // Get all industries
    public List<String> getAllIndustries() {
        return companyRepository.findAllIndustries();
    }
    
    // Get all locations
    public List<String> getAllLocations() {
        return companyRepository.findAllLocations();
    }
}