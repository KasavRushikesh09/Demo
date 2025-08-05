package com.itcompanies.config;

import com.itcompanies.entity.Company;
import com.itcompanies.entity.Career;
import com.itcompanies.repository.CompanyRepository;
import com.itcompanies.repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private CareerRepository careerRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Initialize companies
        initializeCompanies();
        
        // Initialize careers
        initializeCareers();
    }
    
    private void initializeCompanies() {
        if (companyRepository.count() == 0) {
            Company[] companies = {
                new Company("Google", "Leading technology company specializing in internet-related services and products", 
                          "Technology", "Mountain View, CA", 1998, "150,000+", "https://google.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png", 
                          "$307.4 billion", "Sundar Pichai"),
                
                new Company("Microsoft", "Multinational technology company that develops, manufactures, licenses, supports, and sells computer software", 
                          "Technology", "Redmond, WA", 1975, "221,000+", "https://microsoft.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png", 
                          "$198.3 billion", "Satya Nadella"),
                
                new Company("Apple", "Multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services", 
                          "Technology", "Cupertino, CA", 1976, "164,000+", "https://apple.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png", 
                          "$394.3 billion", "Tim Cook"),
                
                new Company("Amazon", "Multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence", 
                          "E-commerce", "Seattle, WA", 1994, "1,608,000+", "https://amazon.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png", 
                          "$514.0 billion", "Andy Jassy"),
                
                new Company("Meta", "Technology company that develops products and services for connecting people", 
                          "Technology", "Menlo Park, CA", 2004, "87,314", "https://meta.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png", 
                          "$116.6 billion", "Mark Zuckerberg"),
                
                new Company("Netflix", "Entertainment company that provides streaming media and video-on-demand online", 
                          "Entertainment", "Los Gatos, CA", 1997, "12,000+", "https://netflix.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png", 
                          "$31.6 billion", "Ted Sarandos"),
                
                new Company("Tesla", "Electric vehicle and clean energy company", 
                          "Automotive", "Austin, TX", 2003, "127,855", "https://tesla.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1200px-Tesla_logo.png", 
                          "$81.5 billion", "Elon Musk"),
                
                new Company("Oracle", "Multinational technology corporation that provides database software and technology", 
                          "Technology", "Austin, TX", 1977, "143,000+", "https://oracle.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/1200px-Oracle_logo.svg.png", 
                          "$42.4 billion", "Safra Catz"),
                
                new Company("IBM", "Multinational technology company that provides hardware, software, and consulting services", 
                          "Technology", "Armonk, NY", 1911, "345,900", "https://ibm.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png", 
                          "$60.5 billion", "Arvind Krishna"),
                
                new Company("Intel", "Multinational corporation and technology company that develops and manufactures semiconductor chips", 
                          "Technology", "Santa Clara, CA", 1968, "121,100", "https://intel.com", 
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282020%2C_light_blue%29.svg/1200px-Intel_logo_%282020%2C_light_blue%29.svg.png", 
                          "$63.1 billion", "Pat Gelsinger")
            };
            
            companyRepository.saveAll(Arrays.asList(companies));
        }
    }
    
    private void initializeCareers() {
        if (careerRepository.count() == 0) {
            Career[] careers = {
                new Career("Senior Software Engineer", "Google", "Mountain View, CA", "Full-time", "Senior", 
                          "Develop and maintain scalable software solutions using cutting-edge technologies", 
                          "5+ years experience, Java, Python, Go", "$150,000 - $250,000", 
                          "Health insurance, 401k, stock options", "2024-12-31", "careers@google.com", "https://careers.google.com"),
                
                new Career("Frontend Developer", "Microsoft", "Redmond, WA", "Full-time", "Mid", 
                          "Build responsive and accessible web applications using React and TypeScript", 
                          "3+ years experience, React, TypeScript, CSS", "$120,000 - $180,000", 
                          "Comprehensive benefits, remote work", "2024-11-30", "jobs@microsoft.com", "https://careers.microsoft.com"),
                
                new Career("iOS Developer", "Apple", "Cupertino, CA", "Full-time", "Senior", 
                          "Create innovative iOS applications that millions of users love", 
                          "5+ years experience, Swift, Objective-C, iOS SDK", "$160,000 - $220,000", 
                          "Health benefits, stock options, product discounts", "2024-12-15", "apple-jobs@apple.com", "https://jobs.apple.com"),
                
                new Career("Cloud Solutions Architect", "Amazon", "Seattle, WA", "Full-time", "Senior", 
                          "Design and implement cloud-based solutions using AWS services", 
                          "7+ years experience, AWS, Python, Java", "$180,000 - $280,000", 
                          "Comprehensive benefits, stock options", "2024-10-31", "aws-jobs@amazon.com", "https://amazon.jobs"),
                
                new Career("Machine Learning Engineer", "Meta", "Menlo Park, CA", "Full-time", "Mid", 
                          "Develop machine learning models for social media platforms", 
                          "3+ years experience, Python, TensorFlow, PyTorch", "$140,000 - $200,000", 
                          "Health insurance, 401k, flexible work", "2024-11-15", "ml-jobs@meta.com", "https://careers.meta.com"),
                
                new Career("DevOps Engineer", "Netflix", "Los Gatos, CA", "Full-time", "Senior", 
                          "Build and maintain infrastructure for streaming services", 
                          "5+ years experience, Kubernetes, Docker, AWS", "$150,000 - $220,000", 
                          "Unlimited vacation, health benefits", "2024-12-01", "devops@netflix.com", "https://jobs.netflix.com"),
                
                new Career("Autonomous Vehicle Engineer", "Tesla", "Austin, TX", "Full-time", "Senior", 
                          "Develop autonomous driving systems for electric vehicles", 
                          "5+ years experience, C++, Python, robotics", "$160,000 - $250,000", 
                          "Stock options, health benefits, vehicle discount", "2024-11-30", "autopilot@tesla.com", "https://www.tesla.com/careers"),
                
                new Career("Database Administrator", "Oracle", "Austin, TX", "Full-time", "Mid", 
                          "Manage and optimize Oracle database systems", 
                          "3+ years experience, Oracle DB, SQL, PL/SQL", "$100,000 - $150,000", 
                          "Health insurance, 401k, training", "2024-10-31", "dba-jobs@oracle.com", "https://careers.oracle.com"),
                
                new Career("AI Research Scientist", "IBM", "Armonk, NY", "Full-time", "Senior", 
                          "Conduct research in artificial intelligence and machine learning", 
                          "PhD in Computer Science, Python, research experience", "$180,000 - $250,000", 
                          "Research opportunities, health benefits", "2024-12-31", "ai-research@ibm.com", "https://careers.ibm.com"),
                
                new Career("Hardware Engineer", "Intel", "Santa Clara, CA", "Full-time", "Mid", 
                          "Design and develop semiconductor chips and hardware components", 
                          "3+ years experience, VLSI design, Verilog", "$130,000 - $190,000", 
                          "Health benefits, stock options, innovation labs", "2024-11-15", "hardware@intel.com", "https://jobs.intel.com")
            };
            
            careerRepository.saveAll(Arrays.asList(careers));
        }
    }
}