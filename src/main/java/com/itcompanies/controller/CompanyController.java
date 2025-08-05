package com.itcompanies.controller;

import com.itcompanies.entity.Company;
import com.itcompanies.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {
    
    @Autowired
    private CompanyService companyService;
    
    // Get all active companies
    @GetMapping
    public ResponseEntity<List<Company>> getAllActiveCompanies() {
        List<Company> companies = companyService.getAllActiveCompanies();
        return ResponseEntity.ok(companies);
    }
    
    // Get all companies (including inactive)
    @GetMapping("/all")
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }
    
    // Get company by ID
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        Optional<Company> company = companyService.getCompanyById(id);
        return company.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Create new company
    @PostMapping
    public ResponseEntity<Company> createCompany(@Valid @RequestBody Company company) {
        Company createdCompany = companyService.createCompany(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCompany);
    }
    
    // Update company
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @Valid @RequestBody Company companyDetails) {
        Optional<Company> updatedCompany = companyService.updateCompany(id, companyDetails);
        return updatedCompany.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete company
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        Optional<Company> deletedCompany = companyService.deleteCompany(id);
        return deletedCompany.isPresent() ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    // Search companies
    @GetMapping("/search")
    public ResponseEntity<List<Company>> searchCompanies(@RequestParam String keyword) {
        List<Company> companies = companyService.searchCompanies(keyword);
        return ResponseEntity.ok(companies);
    }
    
    // Get companies by industry
    @GetMapping("/industry/{industry}")
    public ResponseEntity<List<Company>> getCompaniesByIndustry(@PathVariable String industry) {
        List<Company> companies = companyService.getCompaniesByIndustry(industry);
        return ResponseEntity.ok(companies);
    }
    
    // Get companies by location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Company>> getCompaniesByLocation(@PathVariable String location) {
        List<Company> companies = companyService.getCompaniesByLocation(location);
        return ResponseEntity.ok(companies);
    }
    
    // Get companies by founded year range
    @GetMapping("/founded")
    public ResponseEntity<List<Company>> getCompaniesByFoundedYearRange(
            @RequestParam Integer startYear, @RequestParam Integer endYear) {
        List<Company> companies = companyService.getCompaniesByFoundedYearRange(startYear, endYear);
        return ResponseEntity.ok(companies);
    }
    
    // Get all industries
    @GetMapping("/industries")
    public ResponseEntity<List<String>> getAllIndustries() {
        List<String> industries = companyService.getAllIndustries();
        return ResponseEntity.ok(industries);
    }
    
    // Get all locations
    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {
        List<String> locations = companyService.getAllLocations();
        return ResponseEntity.ok(locations);
    }
}