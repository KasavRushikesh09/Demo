# IT Companies Hub - Full-Stack Application

A comprehensive Java full-stack application for managing top IT companies and exploring career opportunities. This application features a modern React frontend with an innovative design and a robust Spring Boot backend.

## 🚀 Features

### Company Management
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for companies
- **Innovative Card Design**: 3D flip cards with hover animations
- **Advanced Search & Filtering**: Search by name, industry, location, and keywords
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Career Opportunities
- **Job Listings**: Browse active job openings from top IT companies
- **Advanced Filtering**: Filter by job type, experience level, location, and skills
- **Company Integration**: Direct links between companies and their job postings
- **Real-time Updates**: Dynamic job listings with live search

### Modern UI/UX
- **Gradient Backgrounds**: Beautiful gradient designs throughout the app
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Glass Morphism**: Modern glass effect components
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

## 🛠️ Technology Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Application framework
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management
- **REST API** - RESTful web services

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Modern icon library
- **Axios** - HTTP client
- **React Router** - Client-side routing

## 📁 Project Structure

```
/workspace
├── src/main/java/com/itcompanies/
│   ├── ItCompaniesApplication.java
│   ├── model/
│   │   ├── Company.java
│   │   └── JobListing.java
│   ├── repository/
│   │   ├── CompanyRepository.java
│   │   └── JobListingRepository.java
│   ├── service/
│   │   ├── CompanyService.java
│   │   └── JobListingService.java
│   ├── controller/
│   │   ├── CompanyController.java
│   │   └── JobListingController.java
│   └── config/
│       └── DataInitializer.java
├── src/main/resources/
│   └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── CompanyCard.js
│   │   │   └── CompanyModal.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Companies.js
│   │   │   ├── Careers.js
│   │   │   └── About.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── pom.xml
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- npm or yarn
- Maven 3.6 or higher

### Backend Setup

1. **Navigate to the project root**:
   ```bash
   cd /workspace
   ```

2. **Install dependencies and run the application**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. **The backend will start on http://localhost:8080**

4. **Access the H2 Console** (optional):
   - URL: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:itcompaniesdb`
   - Username: `sa`
   - Password: `password`

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **The frontend will start on http://localhost:3000**

## 🌟 Key Features in Detail

### Company Cards
- **3D Flip Animation**: Hover to see additional company details
- **Comprehensive Information**: Logo, description, technologies, services, and stats
- **Action Buttons**: Edit, delete, and view actions for management
- **Responsive Design**: Adapts to different screen sizes

### Search & Filtering
- **Global Search**: Search across company names, descriptions, and locations
- **Industry Filtering**: Filter companies by specific industries
- **Location-based Filtering**: Find companies in specific locations
- **Real-time Results**: Instant filtering as you type

### Career Portal
- **Job Listings**: View all active job openings
- **Company Integration**: See jobs from specific companies
- **Skill Matching**: Filter jobs by required skills
- **Application Process**: Direct application links

### Admin Features
- **Company Management**: Add, edit, and delete companies
- **Job Management**: Manage job listings and postings
- **Data Validation**: Comprehensive form validation
- **Error Handling**: Graceful error handling throughout the app

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Blue gradient (#3b82f6 to #2563eb)
- **Secondary**: Purple accents (#8b5cf6)
- **Success**: Green tones (#10b981)
- **Warning**: Yellow/Orange (#f59e0b)

### Animations
- **Page Transitions**: Smooth fade-in animations
- **Card Interactions**: Hover effects and micro-animations
- **Loading States**: Skeleton screens and pulse animations
- **Scroll Animations**: Elements animate as they come into view

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Tablet Optimization**: Perfect layout for tablet screens
- **Desktop Enhancement**: Enhanced features for larger screens

## 🚀 API Endpoints

### Company Endpoints
- `GET /api/companies` - Get all companies
- `GET /api/companies/{id}` - Get company by ID
- `POST /api/companies` - Create new company
- `PUT /api/companies/{id}` - Update company
- `DELETE /api/companies/{id}` - Delete company
- `GET /api/companies/search?keyword={keyword}` - Search companies
- `GET /api/companies/by-industry?industry={industry}` - Filter by industry

### Job Endpoints
- `GET /api/jobs` - Get all active jobs
- `GET /api/jobs/{id}` - Get job by ID
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job
- `GET /api/jobs/company/{companyId}` - Get jobs by company
- `GET /api/jobs/search?keyword={keyword}` - Search jobs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot** for the excellent backend framework
- **React** for the powerful frontend library
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons

---

**Built with ❤️ for the tech community**