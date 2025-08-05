package com.itcompanies.controller;

import com.itcompanies.entity.Career;
import com.itcompanies.service.CareerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/careers")
@CrossOrigin(origins = "*")
public class CareerController {
    
    @Autowired
    private CareerService careerService;
    
    // Get all active careers
    @GetMapping
    public ResponseEntity<List<Career>> getAllActiveCareers() {
        List<Career> careers = careerService.getAllActiveCareers();
        return ResponseEntity.ok(careers);
    }
    
    // Get all careers (including inactive)
    @GetMapping("/all")
    public ResponseEntity<List<Career>> getAllCareers() {
        List<Career> careers = careerService.getAllCareers();
        return ResponseEntity.ok(careers);
    }
    
    // Get career by ID
    @GetMapping("/{id}")
    public ResponseEntity<Career> getCareerById(@PathVariable Long id) {
        Optional<Career> career = careerService.getCareerById(id);
        return career.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Create new career
    @PostMapping
    public ResponseEntity<Career> createCareer(@Valid @RequestBody Career career) {
        Career createdCareer = careerService.createCareer(career);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCareer);
    }
    
    // Update career
    @PutMapping("/{id}")
    public ResponseEntity<Career> updateCareer(@PathVariable Long id, @Valid @RequestBody Career careerDetails) {
        Optional<Career> updatedCareer = careerService.updateCareer(id, careerDetails);
        return updatedCareer.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete career
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCareer(@PathVariable Long id) {
        Optional<Career> deletedCareer = careerService.deleteCareer(id);
        return deletedCareer.isPresent() ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    // Search careers
    @GetMapping("/search")
    public ResponseEntity<List<Career>> searchCareers(@RequestParam String keyword) {
        List<Career> careers = careerService.searchCareers(keyword);
        return ResponseEntity.ok(careers);
    }
    
    // Get careers by company
    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<Career>> getCareersByCompany(@PathVariable String companyName) {
        List<Career> careers = careerService.getCareersByCompany(companyName);
        return ResponseEntity.ok(careers);
    }
    
    // Get careers by job type
    @GetMapping("/type/{jobType}")
    public ResponseEntity<List<Career>> getCareersByJobType(@PathVariable String jobType) {
        List<Career> careers = careerService.getCareersByJobType(jobType);
        return ResponseEntity.ok(careers);
    }
    
    // Get careers by experience level
    @GetMapping("/level/{experienceLevel}")
    public ResponseEntity<List<Career>> getCareersByExperienceLevel(@PathVariable String experienceLevel) {
        List<Career> careers = careerService.getCareersByExperienceLevel(experienceLevel);
        return ResponseEntity.ok(careers);
    }
    
    // Get careers by location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Career>> getCareersByLocation(@PathVariable String location) {
        List<Career> careers = careerService.getCareersByLocation(location);
        return ResponseEntity.ok(careers);
    }
    
    // Get all job types
    @GetMapping("/job-types")
    public ResponseEntity<List<String>> getAllJobTypes() {
        List<String> jobTypes = careerService.getAllJobTypes();
        return ResponseEntity.ok(jobTypes);
    }
    
    // Get all experience levels
    @GetMapping("/experience-levels")
    public ResponseEntity<List<String>> getAllExperienceLevels() {
        List<String> experienceLevels = careerService.getAllExperienceLevels();
        return ResponseEntity.ok(experienceLevels);
    }
    
    // Get all locations
    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {
        List<String> locations = careerService.getAllLocations();
        return ResponseEntity.ok(locations);
    }
}