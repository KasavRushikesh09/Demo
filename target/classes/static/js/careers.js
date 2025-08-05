// Global variables
let careers = [];
let filteredCareers = [];
let isEditing = false;

// API Base URL
const API_BASE_URL = '/api';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCareers();
    loadCareerFilters();
});

// Load all careers
async function loadCareers() {
    showLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/careers`);
        if (response.ok) {
            careers = await response.json();
            filteredCareers = [...careers];
            displayCareers();
            updateStats();
        } else {
            showError('Failed to load careers');
        }
    } catch (error) {
        console.error('Error loading careers:', error);
        showError('Error loading careers');
    } finally {
        showLoading(false);
    }
}

// Display careers in cards
function displayCareers() {
    const container = document.getElementById('careersContainer');
    container.innerHTML = '';

    if (filteredCareers.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    No jobs found matching your criteria.
                </div>
            </div>
        `;
        return;
    }

    filteredCareers.forEach(career => {
        const card = createCareerCard(career);
        container.appendChild(card);
    });
}

// Create career card
function createCareerCard(career) {
    const col = document.createElement('div');
    col.className = 'col-lg-6 col-xl-4 mb-4';
    
    const jobTypeClass = getJobTypeClass(career.jobType);
    const experienceClass = getExperienceClass(career.experienceLevel);
    
    col.innerHTML = `
        <div class="card career-card h-100">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 class="card-title mb-1">${career.jobTitle}</h5>
                        <p class="text-muted mb-2">
                            <i class="fas fa-building me-1"></i>
                            ${career.companyName}
                        </p>
                    </div>
                    <div class="text-end">
                        <span class="job-type-badge ${jobTypeClass}">${career.jobType}</span>
                        <br>
                        <span class="experience-badge ${experienceClass}">${career.experienceLevel}</span>
                    </div>
                </div>
                
                <div class="career-info mb-3">
                    <div class="mb-2">
                        <i class="fas fa-map-marker-alt"></i>
                        <strong>Location:</strong> ${career.location}
                    </div>
                    ${career.salaryRange ? `
                        <div class="mb-2">
                            <i class="fas fa-dollar-sign"></i>
                            <strong>Salary:</strong> 
                            <span class="salary-highlight">${career.salaryRange}</span>
                        </div>
                    ` : ''}
                    ${career.applicationDeadline ? `
                        <div class="mb-2">
                            <i class="fas fa-calendar"></i>
                            <strong>Deadline:</strong> ${career.applicationDeadline}
                        </div>
                    ` : ''}
                    ${career.postedDate ? `
                        <div class="mb-2">
                            <i class="fas fa-clock"></i>
                            <strong>Posted:</strong> ${career.postedDate}
                        </div>
                    ` : ''}
                </div>
                
                <p class="card-text text-muted mb-3">${career.description}</p>
                
                ${career.requirements ? `
                    <div class="mb-3">
                        <strong>Requirements:</strong>
                        <p class="text-muted small">${career.requirements}</p>
                    </div>
                ` : ''}
                
                ${career.benefits ? `
                    <div class="mb-3">
                        <strong>Benefits:</strong>
                        <p class="text-muted small">${career.benefits}</p>
                    </div>
                ` : ''}
                
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" role="group">
                        <button class="btn btn-warning btn-sm" onclick="editCareer(${career.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCareer(${career.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div>
                        ${career.applicationUrl ? `
                            <a href="${career.applicationUrl}" target="_blank" class="btn btn-success btn-sm me-2">
                                <i class="fas fa-external-link-alt"></i> Apply
                            </a>
                        ` : ''}
                        ${career.contactEmail ? `
                            <a href="mailto:${career.contactEmail}" class="btn btn-primary btn-sm">
                                <i class="fas fa-envelope"></i> Contact
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Get job type CSS class
function getJobTypeClass(jobType) {
    switch (jobType.toLowerCase()) {
        case 'full-time':
            return 'job-type-fulltime';
        case 'part-time':
            return 'job-type-parttime';
        case 'contract':
            return 'job-type-contract';
        case 'internship':
            return 'job-type-internship';
        default:
            return 'job-type-fulltime';
    }
}

// Get experience level CSS class
function getExperienceClass(experienceLevel) {
    switch (experienceLevel.toLowerCase()) {
        case 'entry':
            return 'experience-entry';
        case 'mid':
            return 'experience-mid';
        case 'senior':
            return 'experience-senior';
        case 'executive':
            return 'experience-executive';
        default:
            return 'experience-mid';
    }
}

// Load career filter options
async function loadCareerFilters() {
    try {
        const [jobTypesResponse, experienceLevelsResponse, locationsResponse, companiesResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/careers/job-types`),
            fetch(`${API_BASE_URL}/careers/experience-levels`),
            fetch(`${API_BASE_URL}/careers/locations`),
            fetch(`${API_BASE_URL}/companies`)
        ]);

        if (jobTypesResponse.ok) {
            const jobTypes = await jobTypesResponse.json();
            populateFilter('jobTypeFilter', jobTypes);
        }

        if (experienceLevelsResponse.ok) {
            const experienceLevels = await experienceLevelsResponse.json();
            populateFilter('experienceFilter', experienceLevels);
        }

        if (locationsResponse.ok) {
            const locations = await locationsResponse.json();
            populateFilter('locationFilter', locations);
        }

        if (companiesResponse.ok) {
            const companies = await companiesResponse.json();
            const companyNames = companies.map(c => c.name);
            populateFilter('companyFilter', companyNames);
        }
    } catch (error) {
        console.error('Error loading career filters:', error);
    }
}

// Populate filter dropdown
function populateFilter(filterId, options) {
    const select = document.getElementById(filterId);
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

// Filter careers
function filterCareers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const jobTypeFilter = document.getElementById('jobTypeFilter').value;
    const experienceFilter = document.getElementById('experienceFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const companyFilter = document.getElementById('companyFilter').value;

    filteredCareers = careers.filter(career => {
        const matchesSearch = career.jobTitle.toLowerCase().includes(searchTerm) ||
                            career.description.toLowerCase().includes(searchTerm) ||
                            career.companyName.toLowerCase().includes(searchTerm);
        
        const matchesJobType = !jobTypeFilter || career.jobType === jobTypeFilter;
        const matchesExperience = !experienceFilter || career.experienceLevel === experienceFilter;
        const matchesLocation = !locationFilter || career.location.includes(locationFilter);
        const matchesCompany = !companyFilter || career.companyName === companyFilter;

        return matchesSearch && matchesJobType && matchesExperience && matchesLocation && matchesCompany;
    });

    displayCareers();
}

// Search careers (real-time)
document.getElementById('searchInput').addEventListener('input', filterCareers);

// Show add career modal
function showAddCareerModal() {
    isEditing = false;
    document.getElementById('modalTitle').textContent = 'Add New Job';
    document.getElementById('careerForm').reset();
    document.getElementById('careerId').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('careerModal'));
    modal.show();
}

// Edit career
function editCareer(id) {
    const career = careers.find(c => c.id === id);
    if (!career) return;

    isEditing = true;
    document.getElementById('modalTitle').textContent = 'Edit Job';
    document.getElementById('careerId').value = career.id;
    document.getElementById('jobTitle').value = career.jobTitle;
    document.getElementById('companyName').value = career.companyName;
    document.getElementById('location').value = career.location;
    document.getElementById('jobType').value = career.jobType;
    document.getElementById('experienceLevel').value = career.experienceLevel;
    document.getElementById('description').value = career.description;
    document.getElementById('requirements').value = career.requirements || '';
    document.getElementById('salaryRange').value = career.salaryRange || '';
    document.getElementById('benefits').value = career.benefits || '';
    document.getElementById('applicationDeadline').value = career.applicationDeadline || '';
    document.getElementById('contactEmail').value = career.contactEmail || '';
    document.getElementById('applicationUrl').value = career.applicationUrl || '';

    const modal = new bootstrap.Modal(document.getElementById('careerModal'));
    modal.show();
}

// Save career
async function saveCareer() {
    const form = document.getElementById('careerForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const careerData = {
        jobTitle: document.getElementById('jobTitle').value,
        companyName: document.getElementById('companyName').value,
        location: document.getElementById('location').value,
        jobType: document.getElementById('jobType').value,
        experienceLevel: document.getElementById('experienceLevel').value,
        description: document.getElementById('description').value,
        requirements: document.getElementById('requirements').value || null,
        salaryRange: document.getElementById('salaryRange').value || null,
        benefits: document.getElementById('benefits').value || null,
        applicationDeadline: document.getElementById('applicationDeadline').value || null,
        contactEmail: document.getElementById('contactEmail').value || null,
        applicationUrl: document.getElementById('applicationUrl').value || null
    };

    try {
        const url = isEditing 
            ? `${API_BASE_URL}/careers/${document.getElementById('careerId').value}`
            : `${API_BASE_URL}/careers`;
        
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(careerData)
        });

        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('careerModal'));
            modal.hide();
            
            showSuccess(isEditing ? 'Job updated successfully!' : 'Job added successfully!');
            loadCareers();
        } else {
            showError('Failed to save job');
        }
    } catch (error) {
        console.error('Error saving career:', error);
        showError('Error saving job');
    }
}

// Delete career
async function deleteCareer(id) {
    if (!confirm('Are you sure you want to delete this job?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/careers/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showSuccess('Job deleted successfully!');
            loadCareers();
        } else {
            showError('Failed to delete job');
        }
    } catch (error) {
        console.error('Error deleting career:', error);
        showError('Error deleting job');
    }
}

// Update statistics
function updateStats() {
    const uniqueCompanies = new Set(careers.map(c => c.companyName));
    const uniqueLocations = new Set(careers.map(c => c.location));
    
    // Calculate average salary (simplified)
    const salaries = careers
        .filter(c => c.salaryRange)
        .map(c => {
            const match = c.salaryRange.match(/\$([\d,]+)/);
            return match ? parseInt(match[1].replace(/,/g, '')) : 0;
        })
        .filter(s => s > 0);
    
    const avgSalary = salaries.length > 0 
        ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
        : 0;

    document.getElementById('totalJobs').textContent = careers.length;
    document.getElementById('totalCompanies').textContent = uniqueCompanies.size;
    document.getElementById('totalLocations').textContent = uniqueLocations.size;
    document.getElementById('avgSalary').textContent = `$${avgSalary.toLocaleString()}`;
}

// Show careers (scroll to careers section)
function showCareers() {
    document.querySelector('.search-section').scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'block' : 'none';
}

function showSuccess(message) {
    // You can implement a toast notification here
    alert(message);
}

function showError(message) {
    // You can implement a toast notification here
    alert('Error: ' + message);
}