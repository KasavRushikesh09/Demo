import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedIndustry,
  onIndustryChange,
  industries
}) => {
  const clearSearch = () => {
    onSearchChange('');
  };

  const clearFilter = () => {
    onIndustryChange('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="search-bar"
    >
      <div className="search-container">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search companies by name, industry, location..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="clear-search-btn"
              onClick={clearSearch}
            >
              <X size={16} />
            </motion.button>
          )}
        </div>

        {/* Industry Filter */}
        <div className="filter-wrapper">
          <Filter size={16} className="filter-icon" />
          <select
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="filter-select"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {selectedIndustry && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="clear-filter-btn"
              onClick={clearFilter}
            >
              <X size={14} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedIndustry) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="active-filters"
        >
          <span className="filters-label">Active filters:</span>
          <div className="filter-tags">
            {searchTerm && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="filter-tag search-tag"
              >
                <Search size={12} />
                "{searchTerm}"
                <button onClick={clearSearch} className="tag-remove">
                  <X size={12} />
                </button>
              </motion.span>
            )}
            {selectedIndustry && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="filter-tag industry-tag"
              >
                <Filter size={12} />
                {selectedIndustry}
                <button onClick={clearFilter} className="tag-remove">
                  <X size={12} />
                </button>
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;