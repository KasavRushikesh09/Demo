import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Building2, Users, MapPin, Globe, Phone, Mail } from 'lucide-react';
import CompanyCard from './components/CompanyCard';
import CompanyForm from './components/CompanyForm';
import SearchBar from './components/SearchBar';
import './App.css';

// Sample initial data
const initialCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Technology",
    location: "San Francisco, CA",
    employees: "500-1000",
    website: "https://techcorp.com",
    phone: "+1 (555) 123-4567",
    email: "contact@techcorp.com",
    description: "Leading provider of innovative technology solutions for enterprise clients worldwide.",
    founded: "2015",
    logo: "🚀"
  },
  {
    id: 2,
    name: "Green Energy Co",
    industry: "Renewable Energy",
    location: "Austin, TX",
    employees: "100-500",
    website: "https://greenenergy.com",
    phone: "+1 (555) 987-6543",
    email: "info@greenenergy.com",
    description: "Sustainable energy solutions for a cleaner tomorrow. Specializing in solar and wind power.",
    founded: "2018",
    logo: "🌱"
  },
  {
    id: 3,
    name: "Digital Marketing Pro",
    industry: "Marketing",
    location: "New York, NY",
    employees: "50-100",
    website: "https://digitalmarketingpro.com",
    phone: "+1 (555) 456-7890",
    email: "hello@digitalmarketingpro.com",
    description: "Full-service digital marketing agency helping brands grow their online presence.",
    founded: "2020",
    logo: "📈"
  }
];

function App() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  // Get unique industries for filter
  const industries = [...new Set(companies.map(company => company.industry))];

  // Filter companies based on search and industry
  useEffect(() => {
    let filtered = companies;

    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedIndustry) {
      filtered = filtered.filter(company => company.industry === selectedIndustry);
    }

    setFilteredCompanies(filtered);
  }, [companies, searchTerm, selectedIndustry]);

  const handleAddCompany = (companyData) => {
    const newCompany = {
      ...companyData,
      id: Date.now(),
    };
    setCompanies(prev => [...prev, newCompany]);
    setIsFormOpen(false);
  };

  const handleEditCompany = (companyData) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === editingCompany.id
          ? { ...companyData, id: editingCompany.id }
          : company
      )
    );
    setEditingCompany(null);
    setIsFormOpen(false);
  };

  const handleDeleteCompany = (id) => {
    setCompanies(prev => prev.filter(company => company.id !== id));
  };

  const openEditForm = (company) => {
    setEditingCompany(company);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingCompany(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCompany(null);
  };

  return (
    <div className="app">
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="header-content"
          >
            <div className="header-title">
              <Building2 className="header-icon" />
              <div>
                <h1>Company Cards Manager</h1>
                <p>Manage your business contacts with style</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={openAddForm}
            >
              <Plus size={20} />
              Add Company
            </motion.button>
          </motion.div>
        </header>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="search-section"
        >
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedIndustry={selectedIndustry}
            onIndustryChange={setSelectedIndustry}
            industries={industries}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stats-section"
        >
          <div className="stats-grid">
            <div className="stat-card">
              <Building2 className="stat-icon" />
              <div>
                <div className="stat-number">{companies.length}</div>
                <div className="stat-label">Total Companies</div>
              </div>
            </div>
            <div className="stat-card">
              <Filter className="stat-icon" />
              <div>
                <div className="stat-number">{filteredCompanies.length}</div>
                <div className="stat-label">Filtered Results</div>
              </div>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" />
              <div>
                <div className="stat-number">{industries.length}</div>
                <div className="stat-label">Industries</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Companies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="companies-section"
        >
          {filteredCompanies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="empty-state"
            >
              <Building2 size={64} className="empty-icon" />
              <h3>No companies found</h3>
              <p>
                {searchTerm || selectedIndustry
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first company"}
              </p>
              {!searchTerm && !selectedIndustry && (
                <button className="btn btn-primary" onClick={openAddForm}>
                  <Plus size={20} />
                  Add First Company
                </button>
              )}
            </motion.div>
          ) : (
            <div className="companies-grid">
              <AnimatePresence>
                {filteredCompanies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CompanyCard
                      company={company}
                      onEdit={openEditForm}
                      onDelete={handleDeleteCompany}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <CompanyForm
            company={editingCompany}
            onSubmit={editingCompany ? handleEditCompany : handleAddCompany}
            onClose={closeForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;