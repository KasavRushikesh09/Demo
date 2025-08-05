package com.itcompanies.controller;

import com.itcompanies.model.Company;
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
    
    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        Optional<Company> company = companyService.getCompanyById(id);
        return company.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Company> createCompany(@Valid @RequestBody Company company) {
        try {
            Company savedCompany = companyService.saveCompany(company);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCompany);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, 
                                               @Valid @RequestBody Company company) {
        try {
            Company updatedCompany = companyService.updateCompany(id, company);
            return ResponseEntity.ok(updatedCompany);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        try {
            if (companyService.existsById(id)) {
                companyService.deleteCompany(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Company>> searchCompanies(@RequestParam String keyword) {
        List<Company> companies = companyService.searchByKeyword(keyword);
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/by-name")
    public ResponseEntity<List<Company>> getCompaniesByName(@RequestParam String name) {
        List<Company> companies = companyService.searchCompaniesByName(name);
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/by-industry")
    public ResponseEntity<List<Company>> getCompaniesByIndustry(@RequestParam String industry) {
        List<Company> companies = companyService.getCompaniesByIndustry(industry);
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/by-location")
    public ResponseEntity<List<Company>> getCompaniesByLocation(@RequestParam String location) {
        List<Company> companies = companyService.searchCompaniesByLocation(location);
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/industries")
    public ResponseEntity<List<String>> getAllIndustries() {
        List<String> industries = companyService.getAllIndustries();
        return ResponseEntity.ok(industries);
    }
    
    @GetMapping("/by-founded-year")
    public ResponseEntity<List<Company>> getCompaniesByFoundedYear(
            @RequestParam Integer startYear, 
            @RequestParam Integer endYear) {
        List<Company> companies = companyService.getCompaniesByFoundedYearRange(startYear, endYear);
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getCompaniesCount() {
        long count = companyService.count();
        return ResponseEntity.ok(count);
    }
}