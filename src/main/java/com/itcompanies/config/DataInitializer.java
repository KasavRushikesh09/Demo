package com.itcompanies.config;

import com.itcompanies.model.Company;
import com.itcompanies.model.JobListing;
import com.itcompanies.model.JobListing.JobType;
import com.itcompanies.model.JobListing.ExperienceLevel;
import com.itcompanies.repository.CompanyRepository;
import com.itcompanies.repository.JobListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private JobListingRepository jobListingRepository;
    
    @Override
    public void run(String... args) throws Exception {
        initializeCompanies();
        initializeJobListings();
    }
    
    private void initializeCompanies() {
        // Google
        Company google = new Company();
        google.setName("Google");
        google.setDescription("Google LLC is an American multinational technology company that specializes in Internet-related services and products, including online advertising technologies, a search engine, cloud computing, software, and hardware.");
        google.setIndustry("Technology");
        google.setWebsite("https://www.google.com");
        google.setLocation("Mountain View, California, USA");
        google.setFoundedYear(1998);
        google.setEmployeeCount("156,000+");
        google.setRevenue("$282.8 billion (2022)");
        google.setLogoUrl("https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png");
        google.setTechnologies(Arrays.asList("AI/ML", "Cloud Computing", "Search Algorithms", "Android", "Kubernetes", "TensorFlow"));
        google.setServices(Arrays.asList("Search Engine", "Cloud Platform", "Advertising", "Mobile OS", "Productivity Tools"));
        companyRepository.save(google);
        
        // Microsoft
        Company microsoft = new Company();
        microsoft.setName("Microsoft");
        microsoft.setDescription("Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.");
        microsoft.setIndustry("Technology");
        microsoft.setWebsite("https://www.microsoft.com");
        microsoft.setLocation("Redmond, Washington, USA");
        microsoft.setFoundedYear(1975);
        microsoft.setEmployeeCount("221,000+");
        microsoft.setRevenue("$211.9 billion (2022)");
        microsoft.setLogoUrl("https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png");
        microsoft.setTechnologies(Arrays.asList("Azure", ".NET", "Windows", "Office 365", "AI", "Mixed Reality"));
        microsoft.setServices(Arrays.asList("Cloud Services", "Operating Systems", "Productivity Software", "Gaming", "Enterprise Solutions"));
        companyRepository.save(microsoft);
        
        // Apple
        Company apple = new Company();
        apple.setName("Apple Inc.");
        apple.setDescription("Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.");
        apple.setIndustry("Technology");
        apple.setWebsite("https://www.apple.com");
        apple.setLocation("Cupertino, California, USA");
        apple.setFoundedYear(1976);
        apple.setEmployeeCount("164,000+");
        apple.setRevenue("$394.3 billion (2022)");
        apple.setLogoUrl("https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png");
        apple.setTechnologies(Arrays.asList("iOS", "macOS", "Swift", "Metal", "Core ML", "ARKit"));
        apple.setServices(Arrays.asList("Consumer Electronics", "Software", "Digital Services", "App Store"));
        companyRepository.save(apple);
        
        // Amazon
        Company amazon = new Company();
        amazon.setName("Amazon");
        amazon.setDescription("Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.");
        amazon.setIndustry("E-commerce/Cloud Computing");
        amazon.setWebsite("https://www.amazon.com");
        amazon.setLocation("Seattle, Washington, USA");
        amazon.setFoundedYear(1994);
        amazon.setEmployeeCount("1,500,000+");
        amazon.setRevenue("$513.9 billion (2022)");
        amazon.setLogoUrl("https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png");
        amazon.setTechnologies(Arrays.asList("AWS", "Alexa", "Machine Learning", "Serverless", "Containers", "Big Data"));
        amazon.setServices(Arrays.asList("E-commerce", "Cloud Computing", "Digital Streaming", "AI Assistant", "Logistics"));
        companyRepository.save(amazon);
        
        // Meta (Facebook)
        Company meta = new Company();
        meta.setName("Meta (Facebook)");
        meta.setDescription("Meta Platforms, Inc., doing business as Meta and formerly known as Facebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California.");
        meta.setIndustry("Social Media/VR");
        meta.setWebsite("https://www.meta.com");
        meta.setLocation("Menlo Park, California, USA");
        meta.setFoundedYear(2004);
        meta.setEmployeeCount("87,000+");
        meta.setRevenue("$116.6 billion (2022)");
        meta.setLogoUrl("https://logos-world.net/wp-content/uploads/2020/11/Meta-Logo.png");
        meta.setTechnologies(Arrays.asList("React", "VR/AR", "AI/ML", "GraphQL", "PyTorch", "Metaverse"));
        meta.setServices(Arrays.asList("Social Networking", "Virtual Reality", "Messaging", "Digital Advertising"));
        companyRepository.save(meta);
        
        // Netflix
        Company netflix = new Company();
        netflix.setName("Netflix");
        netflix.setDescription("Netflix, Inc. is an American subscription streaming service and production company based in Los Gatos, California.");
        netflix.setIndustry("Entertainment/Streaming");
        netflix.setWebsite("https://www.netflix.com");
        netflix.setLocation("Los Gatos, California, USA");
        netflix.setFoundedYear(1997);
        netflix.setEmployeeCount("12,800+");
        netflix.setRevenue("$31.6 billion (2022)");
        netflix.setLogoUrl("https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png");
        netflix.setTechnologies(Arrays.asList("Microservices", "Machine Learning", "Big Data", "Cloud Native", "CDN", "Recommendation Systems"));
        netflix.setServices(Arrays.asList("Video Streaming", "Content Production", "Global Entertainment"));
        companyRepository.save(netflix);
        
        // Tesla
        Company tesla = new Company();
        tesla.setName("Tesla");
        tesla.setDescription("Tesla, Inc. is an American multinational automotive and clean energy company headquartered in Austin, Texas.");
        tesla.setIndustry("Automotive/Clean Energy");
        tesla.setWebsite("https://www.tesla.com");
        tesla.setLocation("Austin, Texas, USA");
        tesla.setFoundedYear(2003);
        tesla.setEmployeeCount("127,000+");
        tesla.setRevenue("$81.5 billion (2022)");
        tesla.setLogoUrl("https://logos-world.net/wp-content/uploads/2020/09/Tesla-Logo.png");
        tesla.setTechnologies(Arrays.asList("Electric Vehicles", "Autopilot", "Battery Technology", "Solar Energy", "Supercharging"));
        tesla.setServices(Arrays.asList("Electric Vehicles", "Energy Storage", "Solar Panels", "Autonomous Driving"));
        companyRepository.save(tesla);
        
        // Salesforce
        Company salesforce = new Company();
        salesforce.setName("Salesforce");
        salesforce.setDescription("Salesforce, Inc. is an American cloud-based software company headquartered in San Francisco, California.");
        salesforce.setIndustry("Cloud Software/CRM");
        salesforce.setWebsite("https://www.salesforce.com");
        salesforce.setLocation("San Francisco, California, USA");
        salesforce.setFoundedYear(1999);
        salesforce.setEmployeeCount("79,000+");
        salesforce.setRevenue("$31.4 billion (2023)");
        salesforce.setLogoUrl("https://logos-world.net/wp-content/uploads/2020/09/Salesforce-Logo.png");
        salesforce.setTechnologies(Arrays.asList("CRM", "Cloud Computing", "AI (Einstein)", "Lightning Platform", "Heroku"));
        salesforce.setServices(Arrays.asList("Customer Relationship Management", "Cloud Applications", "Platform Services", "Analytics"));
        companyRepository.save(salesforce);
    }
    
    private void initializeJobListings() {
        List<Company> companies = companyRepository.findAll();
        
        if (!companies.isEmpty()) {
            // Google Jobs
            Company google = companies.stream().filter(c -> c.getName().equals("Google")).findFirst().orElse(null);
            if (google != null) {
                createJobListing(google, "Senior Software Engineer", 
                    "Join Google's engineering team to build products that impact billions of users worldwide. Work on cutting-edge technologies and solve complex problems at scale.",
                    JobType.FULL_TIME, ExperienceLevel.SENIOR_LEVEL, "$180,000 - $250,000",
                    Arrays.asList("Java", "Python", "Go", "Distributed Systems", "Machine Learning"),
                    Arrays.asList("Health Insurance", "Stock Options", "Free Meals", "Flexible Work"));
                
                createJobListing(google, "Product Manager - AI", 
                    "Lead AI product initiatives at Google. Define product strategy and work with cross-functional teams to deliver innovative AI solutions.",
                    JobType.FULL_TIME, ExperienceLevel.MID_LEVEL, "$160,000 - $220,000",
                    Arrays.asList("Product Management", "AI/ML", "Strategy", "Analytics"),
                    Arrays.asList("Comprehensive Benefits", "Learning Budget", "Remote Work Options"));
            }
            
            // Microsoft Jobs
            Company microsoft = companies.stream().filter(c -> c.getName().equals("Microsoft")).findFirst().orElse(null);
            if (microsoft != null) {
                createJobListing(microsoft, "Cloud Solutions Architect", 
                    "Design and implement cloud solutions using Microsoft Azure. Help enterprise customers transform their businesses through cloud technology.",
                    JobType.FULL_TIME, ExperienceLevel.SENIOR_LEVEL, "$170,000 - $240,000",
                    Arrays.asList("Azure", "Cloud Architecture", "DevOps", "Kubernetes", "Terraform"),
                    Arrays.asList("Health & Wellness", "Stock Purchase Plan", "Flexible Schedule"));
                
                createJobListing(microsoft, "Software Engineer Intern", 
                    "Join Microsoft's internship program and work on real projects that impact millions of users. Gain hands-on experience with cutting-edge technologies.",
                    JobType.INTERNSHIP, ExperienceLevel.ENTRY_LEVEL, "$8,000 - $10,000/month",
                    Arrays.asList("C#", ".NET", "Software Development", "Problem Solving"),
                    Arrays.asList("Mentorship", "Learning Opportunities", "Networking Events"));
            }
            
            // Meta Jobs
            Company meta = companies.stream().filter(c -> c.getName().equals("Meta (Facebook)")).findFirst().orElse(null);
            if (meta != null) {
                createJobListing(meta, "VR/AR Software Engineer", 
                    "Build the future of virtual and augmented reality at Meta. Work on cutting-edge VR/AR applications and contribute to the metaverse.",
                    JobType.FULL_TIME, ExperienceLevel.MID_LEVEL, "$175,000 - $230,000",
                    Arrays.asList("C++", "Unity", "Unreal Engine", "VR/AR", "Computer Vision"),
                    Arrays.asList("Competitive Salary", "Equity", "Wellness Programs", "Free Food"));
            }
        }
    }
    
    private void createJobListing(Company company, String title, String description, 
                                JobType jobType, ExperienceLevel level, String salary,
                                List<String> skills, List<String> benefits) {
        JobListing job = new JobListing();
        job.setTitle(title);
        job.setDescription(description);
        job.setCompany(company);
        job.setLocation(company.getLocation());
        job.setJobType(jobType);
        job.setExperienceLevel(level);
        job.setSalaryRange(salary);
        job.setRequiredSkills(skills);
        job.setBenefits(benefits);
        job.setApplicationDeadline(LocalDateTime.now().plusDays(30));
        job.setActive(true);
        jobListingRepository.save(job);
    }
}