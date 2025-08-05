package com.itcompanies.service;

import com.itcompanies.model.Company;
import com.itcompanies.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CompanyService {
    
    @Autowired
    private CompanyRepository companyRepository;
    
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
    
    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }
    
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }
    
    public Company updateCompany(Long id, Company updatedCompany) {
        return companyRepository.findById(id)
                .map(company -> {
                    company.setName(updatedCompany.getName());
                    company.setDescription(updatedCompany.getDescription());
                    company.setIndustry(updatedCompany.getIndustry());
                    company.setWebsite(updatedCompany.getWebsite());
                    company.setLocation(updatedCompany.getLocation());
                    company.setFoundedYear(updatedCompany.getFoundedYear());
                    company.setEmployeeCount(updatedCompany.getEmployeeCount());
                    company.setRevenue(updatedCompany.getRevenue());
                    company.setLogoUrl(updatedCompany.getLogoUrl());
                    company.setTechnologies(updatedCompany.getTechnologies());
                    company.setServices(updatedCompany.getServices());
                    return companyRepository.save(company);
                })
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }
    
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
    
    public List<Company> searchCompaniesByName(String name) {
        return companyRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Company> getCompaniesByIndustry(String industry) {
        return companyRepository.findByIndustryIgnoreCase(industry);
    }
    
    public List<Company> searchCompaniesByLocation(String location) {
        return companyRepository.findByLocationContainingIgnoreCase(location);
    }
    
    public List<String> getAllIndustries() {
        return companyRepository.findDistinctIndustries();
    }
    
    public List<Company> searchByKeyword(String keyword) {
        return companyRepository.searchByKeyword(keyword);
    }
    
    public List<Company> getCompaniesByFoundedYearRange(Integer startYear, Integer endYear) {
        return companyRepository.findByFoundedYearBetween(startYear, endYear);
    }
    
    public boolean existsById(Long id) {
        return companyRepository.existsById(id);
    }
    
    public long count() {
        return companyRepository.count();
    }
}