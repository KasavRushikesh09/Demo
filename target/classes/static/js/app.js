// Global variables
let companies = [];
let filteredCompanies = [];
let isEditing = false;

// API Base URL
const API_BASE_URL = '/api';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCompanies();
    loadFilters();
});

// Load all companies
async function loadCompanies() {
    showLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/companies`);
        if (response.ok) {
            companies = await response.json();
            filteredCompanies = [...companies];
            displayCompanies();
            updateStats();
        } else {
            showError('Failed to load companies');
        }
    } catch (error) {
        console.error('Error loading companies:', error);
        showError('Error loading companies');
    } finally {
        showLoading(false);
    }
}

// Display companies in cards
function displayCompanies() {
    const container = document.getElementById('companiesContainer');
    container.innerHTML = '';

    if (filteredCompanies.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    No companies found matching your criteria.
                </div>
            </div>
        `;
        return;
    }

    filteredCompanies.forEach(company => {
        const card = createCompanyCard(company);
        container.appendChild(card);
    });
}

// Create company card
function createCompanyCard(company) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    const logoUrl = company.logoUrl || 'https://via.placeholder.com/80x80?text=' + company.name.charAt(0);
    
    col.innerHTML = `
        <div class="card company-card h-100">
            <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                    <img src="${logoUrl}" alt="${company.name}" class="company-logo me-3">
                    <div>
                        <h5 class="card-title mb-1">${company.name}</h5>
                        <span class="badge bg-primary">${company.industry}</span>
                    </div>
                </div>
                
                <p class="card-text text-muted mb-3">${company.description}</p>
                
                <div class="company-info mb-3">
                    <div class="mb-2">
                        <i class="fas fa-map-marker-alt"></i>
                        <strong>Headquarters:</strong> ${company.headquarters}
                    </div>
                    <div class="mb-2">
                        <i class="fas fa-calendar"></i>
                        <strong>Founded:</strong> ${company.foundedYear}
                    </div>
                    ${company.employeeCount ? `
                        <div class="mb-2">
                            <i class="fas fa-users"></i>
                            <strong>Employees:</strong> ${company.employeeCount}
                        </div>
                    ` : ''}
                    ${company.revenue ? `
                        <div class="mb-2">
                            <i class="fas fa-dollar-sign"></i>
                            <strong>Revenue:</strong> ${company.revenue}
                        </div>
                    ` : ''}
                    ${company.ceo ? `
                        <div class="mb-2">
                            <i class="fas fa-user-tie"></i>
                            <strong>CEO:</strong> ${company.ceo}
                        </div>
                    ` : ''}
                </div>
                
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" role="group">
                        <button class="btn btn-warning btn-sm" onclick="editCompany(${company.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCompany(${company.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    ${company.website ? `
                        <a href="${company.website}" target="_blank" class="btn btn-primary btn-sm">
                            <i class="fas fa-external-link-alt"></i> Visit
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Load filter options
async function loadFilters() {
    try {
        const [industriesResponse, locationsResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/companies/industries`),
            fetch(`${API_BASE_URL}/companies/locations`)
        ]);

        if (industriesResponse.ok) {
            const industries = await industriesResponse.json();
            populateFilter('industryFilter', industries);
        }

        if (locationsResponse.ok) {
            const locations = await locationsResponse.json();
            populateFilter('locationFilter', locations);
        }
    } catch (error) {
        console.error('Error loading filters:', error);
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

// Filter companies
function filterCompanies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const industryFilter = document.getElementById('industryFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;

    filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm) ||
                            company.description.toLowerCase().includes(searchTerm) ||
                            company.industry.toLowerCase().includes(searchTerm);
        
        const matchesIndustry = !industryFilter || company.industry === industryFilter;
        const matchesLocation = !locationFilter || company.headquarters.includes(locationFilter);

        return matchesSearch && matchesIndustry && matchesLocation;
    });

    displayCompanies();
}

// Search companies (real-time)
document.getElementById('searchInput').addEventListener('input', filterCompanies);

// Show add company modal
function showAddCompanyModal() {
    isEditing = false;
    document.getElementById('modalTitle').textContent = 'Add New Company';
    document.getElementById('companyForm').reset();
    document.getElementById('companyId').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('companyModal'));
    modal.show();
}

// Edit company
function editCompany(id) {
    const company = companies.find(c => c.id === id);
    if (!company) return;

    isEditing = true;
    document.getElementById('modalTitle').textContent = 'Edit Company';
    document.getElementById('companyId').value = company.id;
    document.getElementById('companyName').value = company.name;
    document.getElementById('companyIndustry').value = company.industry;
    document.getElementById('companyHeadquarters').value = company.headquarters;
    document.getElementById('companyFoundedYear').value = company.foundedYear;
    document.getElementById('companyDescription').value = company.description;
    document.getElementById('companyEmployeeCount').value = company.employeeCount || '';
    document.getElementById('companyRevenue').value = company.revenue || '';
    document.getElementById('companyCeo').value = company.ceo || '';
    document.getElementById('companyWebsite').value = company.website || '';
    document.getElementById('companyLogoUrl').value = company.logoUrl || '';

    const modal = new bootstrap.Modal(document.getElementById('companyModal'));
    modal.show();
}

// Save company
async function saveCompany() {
    const form = document.getElementById('companyForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const companyData = {
        name: document.getElementById('companyName').value,
        industry: document.getElementById('companyIndustry').value,
        headquarters: document.getElementById('companyHeadquarters').value,
        foundedYear: parseInt(document.getElementById('companyFoundedYear').value),
        description: document.getElementById('companyDescription').value,
        employeeCount: document.getElementById('companyEmployeeCount').value || null,
        revenue: document.getElementById('companyRevenue').value || null,
        ceo: document.getElementById('companyCeo').value || null,
        website: document.getElementById('companyWebsite').value || null,
        logoUrl: document.getElementById('companyLogoUrl').value || null
    };

    try {
        const url = isEditing 
            ? `${API_BASE_URL}/companies/${document.getElementById('companyId').value}`
            : `${API_BASE_URL}/companies`;
        
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        });

        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('companyModal'));
            modal.hide();
            
            showSuccess(isEditing ? 'Company updated successfully!' : 'Company added successfully!');
            loadCompanies();
        } else {
            showError('Failed to save company');
        }
    } catch (error) {
        console.error('Error saving company:', error);
        showError('Error saving company');
    }
}

// Delete company
async function deleteCompany(id) {
    if (!confirm('Are you sure you want to delete this company?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showSuccess('Company deleted successfully!');
            loadCompanies();
        } else {
            showError('Failed to delete company');
        }
    } catch (error) {
        console.error('Error deleting company:', error);
        showError('Error deleting company');
    }
}

// Update statistics
function updateStats() {
    const uniqueIndustries = new Set(companies.map(c => c.industry));
    const uniqueLocations = new Set(companies.map(c => c.headquarters));

    document.getElementById('totalCompanies').textContent = companies.length;
    document.getElementById('totalIndustries').textContent = uniqueIndustries.size;
    document.getElementById('totalLocations').textContent = uniqueLocations.size;
}

// Show companies (scroll to companies section)
function showCompanies() {
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