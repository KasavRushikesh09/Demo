# IT Companies Portal - Java Full Stack Application

A comprehensive full-stack Java application built with Spring Boot that showcases top IT companies and their career opportunities. This innovative application features a modern, responsive UI with advanced filtering and search capabilities.

## 🚀 Features

### Companies Management
- **Multiple Company Cards**: Display top IT companies in an attractive card format
- **CRUD Operations**: Create, Read, Update, and Delete company information
- **Advanced Search**: Real-time search across company names, descriptions, and industries
- **Smart Filtering**: Filter by industry, location, and founded year range
- **Statistics Dashboard**: Real-time statistics showing total companies, industries, and locations

### Careers Management
- **Job Opportunities**: Comprehensive job listings with detailed information
- **Advanced Filtering**: Filter by job type, experience level, location, and company
- **Salary Information**: Display salary ranges and benefits
- **Application Links**: Direct links to apply for positions
- **Contact Information**: Email and application URL integration

### Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Glass Morphism**: Modern glassmorphism design with backdrop blur effects
- **Gradient Backgrounds**: Beautiful gradient backgrounds and hover effects
- **Interactive Cards**: Hover animations and smooth transitions
- **Floating Action Buttons**: Easy access to add new companies and careers

### Technical Features
- **RESTful API**: Complete REST API with proper HTTP methods
- **Data Validation**: Server-side validation for all inputs
- **Soft Delete**: Companies and careers are soft-deleted (marked as inactive)
- **H2 Database**: In-memory database with sample data
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Backend
- **Java 17**: Latest LTS version
- **Spring Boot 3.2.0**: Modern Spring framework
- **Spring Data JPA**: Database abstraction layer
- **H2 Database**: In-memory database for development
- **Maven**: Dependency management and build tool

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **Bootstrap 5**: Responsive UI framework
- **Font Awesome**: Icon library

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd it-companies-portal
```

### 2. Build the Application
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

### 4. Access the Application
Open your web browser and navigate to:
- **Main Application**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

## 📁 Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/itcompanies/
│   │       ├── ItCompaniesPortalApplication.java
│   │       ├── config/
│   │       │   └── DataInitializer.java
│   │       ├── controller/
│   │       │   ├── CompanyController.java
│   │       │   └── CareerController.java
│   │       ├── entity/
│   │       │   ├── Company.java
│   │       │   └── Career.java
│   │       ├── repository/
│   │       │   ├── CompanyRepository.java
│   │       │   └── CareerRepository.java
│   │       └── service/
│   │           ├── CompanyService.java
│   │           └── CareerService.java
│   └── resources/
│       ├── static/
│       │   ├── index.html
│       │   ├── careers.html
│       │   └── js/
│       │       ├── app.js
│       │       └── careers.js
│       └── application.properties
└── test/
    └── java/
        └── com/itcompanies/
```

## 🎯 API Endpoints

### Companies API
- `GET /api/companies` - Get all active companies
- `GET /api/companies/{id}` - Get company by ID
- `POST /api/companies` - Create new company
- `PUT /api/companies/{id}` - Update company
- `DELETE /api/companies/{id}` - Delete company
- `GET /api/companies/search?keyword={keyword}` - Search companies
- `GET /api/companies/industry/{industry}` - Get companies by industry
- `GET /api/companies/location/{location}` - Get companies by location
- `GET /api/companies/industries` - Get all industries
- `GET /api/companies/locations` - Get all locations

### Careers API
- `GET /api/careers` - Get all active careers
- `GET /api/careers/{id}` - Get career by ID
- `POST /api/careers` - Create new career
- `PUT /api/careers/{id}` - Update career
- `DELETE /api/careers/{id}` - Delete career
- `GET /api/careers/search?keyword={keyword}` - Search careers
- `GET /api/careers/company/{companyName}` - Get careers by company
- `GET /api/careers/type/{jobType}` - Get careers by job type
- `GET /api/careers/level/{experienceLevel}` - Get careers by experience level
- `GET /api/careers/location/{location}` - Get careers by location
- `GET /api/careers/job-types` - Get all job types
- `GET /api/careers/experience-levels` - Get all experience levels
- `GET /api/careers/locations` - Get all locations

## 🎨 UI Features

### Companies Page
- **Hero Section**: Attractive landing section with call-to-action buttons
- **Search & Filter**: Advanced search with industry and location filters
- **Statistics Cards**: Real-time statistics display
- **Company Cards**: Beautiful cards with company logos, information, and actions
- **Floating Add Button**: Easy access to add new companies
- **Modal Forms**: Clean forms for adding/editing companies

### Careers Page
- **Job Cards**: Detailed job cards with salary highlights
- **Badge System**: Color-coded badges for job types and experience levels
- **Multiple Filters**: Filter by job type, experience, location, and company
- **Apply Buttons**: Direct links to apply for positions
- **Contact Options**: Email and application URL integration

## 🔧 Configuration

The application uses the following configuration in `application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration (H2)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# CORS Configuration
spring.web.cors.allowed-origins=*
```

## 📊 Sample Data

The application comes pre-loaded with sample data for:

### Top IT Companies
- Google, Microsoft, Apple, Amazon, Meta
- Netflix, Tesla, Oracle, IBM, Intel

### Sample Careers
- Software Engineer, Frontend Developer, iOS Developer
- Cloud Solutions Architect, Machine Learning Engineer
- DevOps Engineer, Autonomous Vehicle Engineer
- Database Administrator, AI Research Scientist, Hardware Engineer

## 🚀 Deployment

### Local Development
```bash
mvn spring-boot:run
```

### Production Build
```bash
mvn clean package
java -jar target/it-companies-portal-1.0.0.jar
```

### Docker Deployment
```bash
# Build Docker image
docker build -t it-companies-portal .

# Run Docker container
docker run -p 8080:8080 it-companies-portal
```

## 🧪 Testing

Run the application tests:
```bash
mvn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the application logs
2. Verify the database connection
3. Ensure all dependencies are properly installed
4. Check the browser console for JavaScript errors

## 🎉 Features Highlights

- **Innovative Design**: Modern glassmorphism UI with gradient backgrounds
- **Responsive Layout**: Works perfectly on all device sizes
- **Real-time Search**: Instant search results as you type
- **Advanced Filtering**: Multiple filter options for precise results
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Statistics Dashboard**: Real-time statistics and analytics
- **Sample Data**: Pre-loaded with top IT companies and careers
- **RESTful API**: Clean, well-documented API endpoints
- **Error Handling**: Comprehensive error handling and user feedback
- **Modern JavaScript**: ES6+ features with async/await
- **Bootstrap 5**: Latest responsive framework
- **Font Awesome Icons**: Beautiful iconography throughout

This application demonstrates modern full-stack development practices with a focus on user experience, performance, and maintainability.