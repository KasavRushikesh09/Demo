import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Grid, 
  List,
  MapPin,
  Building,
  Calendar,
  X
} from 'lucide-react';
import CompanyCard from '../components/CompanyCard';
import CompanyModal from '../components/CompanyModal';
import { companyAPI } from '../services/api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [industries, setIndustries] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    loadCompanies();
    loadIndustries();
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [companies, searchTerm, selectedIndustry, selectedLocation]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const response = await companyAPI.getAllCompanies();
      setCompanies(response.data);
    } catch (error) {
      console.error('Error loading companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadIndustries = async () => {
    try {
      const response = await companyAPI.getAllIndustries();
      setIndustries(response.data);
    } catch (error) {
      console.error('Error loading industries:', error);
    }
  };

  const filterCompanies = () => {
    let filtered = companies;

    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedIndustry) {
      filtered = filtered.filter(company => 
        company.industry.toLowerCase() === selectedIndustry.toLowerCase()
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(company =>
        company.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredCompanies(filtered);
  };

  const handleAddCompany = () => {
    setEditingCompany(null);
    setShowModal(true);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowModal(true);
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companyAPI.deleteCompany(id);
        loadCompanies();
      } catch (error) {
        console.error('Error deleting company:', error);
        alert('Error deleting company. Please try again.');
      }
    }
  };

  const handleViewCompany = (company) => {
    // Navigate to company detail page or show detailed modal
    console.log('View company:', company);
  };

  const handleSaveCompany = async (companyData) => {
    try {
      if (editingCompany) {
        await companyAPI.updateCompany(editingCompany.id, companyData);
      } else {
        await companyAPI.createCompany(companyData);
      }
      setShowModal(false);
      loadCompanies();
    } catch (error) {
      console.error('Error saving company:', error);
      throw error;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setSelectedLocation('');
  };

  const uniqueLocations = [...new Set(companies.map(c => c.location.split(',')[0].trim()))]
    .sort();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              IT <span className="text-gradient">Companies</span>
            </h1>
            <p className="text-xl text-gray-600">
              Discover and manage the world's leading technology companies
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-6 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddCompany}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Company</span>
            </button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies by name, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            {(searchTerm || selectedIndustry || selectedLocation) && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-600">
            Showing {filteredCompanies.length} of {companies.length} companies
          </p>
        </motion.div>

        {/* Companies Grid/List */}
        {loading ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card h-96 bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or clear the filters.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CompanyCard
                  company={company}
                  onEdit={handleEditCompany}
                  onDelete={handleDeleteCompany}
                  onView={handleViewCompany}
                  showActions={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Company Modal */}
        {showModal && (
          <CompanyModal
            company={editingCompany}
            onSave={handleSaveCompany}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Companies;