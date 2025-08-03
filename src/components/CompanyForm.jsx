import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Building2, MapPin, Users, Globe, Phone, Mail, Calendar, Briefcase } from 'lucide-react';
import './CompanyForm.css';

const CompanyForm = ({ company, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    employees: '',
    website: '',
    phone: '',
    email: '',
    description: '',
    founded: '',
    logo: '🏢'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Emoji options for company logos
  const logoOptions = [
    '🏢', '🚀', '💡', '🌱', '⚡', '🔧', '📈', '💻', '🎯', '🌟',
    '🔥', '💎', '🎨', '🏆', '🌍', '🚗', '🏥', '🎓', '🍕', '☕'
  ];

  // Industry options
  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Real Estate', 'Food & Beverage', 'Transportation', 'Energy',
    'Marketing', 'Consulting', 'Entertainment', 'Non-profit', 'Government',
    'Agriculture', 'Construction', 'Telecommunications', 'Renewable Energy', 'Other'
  ];

  // Employee count options
  const employeeOptions = [
    '1-10', '11-50', '51-100', '101-500', '501-1000', '1000-5000', '5000+'
  ];

  useEffect(() => {
    if (company) {
      setFormData(company);
    }
  }, [company]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.employees) {
      newErrors.employees = 'Employee count is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (include http:// or https://)';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Company description is required';
    }

    if (!formData.founded || formData.founded < 1800 || formData.founded > new Date().getFullYear()) {
      newErrors.founded = 'Please enter a valid founding year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="form-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
      >
        {/* Header */}
        <div className="form-header">
          <div className="form-title">
            <Building2 className="form-icon" />
            <h2>{company ? 'Edit Company' : 'Add New Company'}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="company-form">
          <div className="form-content">
            {/* Logo Selection */}
            <div className="form-group">
              <label className="form-label">
                <Briefcase size={16} />
                Company Logo
              </label>
              <div className="logo-selector">
                {logoOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`logo-option ${formData.logo === emoji ? 'selected' : ''}`}
                    onClick={() => handleChange('logo', emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Building2 size={16} />
                  Company Name *
                </label>
                <input
                  type="text"
                  className={`input ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter company name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Briefcase size={16} />
                  Industry *
                </label>
                <select
                  className={`input ${errors.industry ? 'error' : ''}`}
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                >
                  <option value="">Select industry</option>
                  {industryOptions.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {errors.industry && <span className="error-message">{errors.industry}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={16} />
                  Location *
                </label>
                <input
                  type="text"
                  className={`input ${errors.location ? 'error' : ''}`}
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="City, State/Country"
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Users size={16} />
                  Employee Count *
                </label>
                <select
                  className={`input ${errors.employees ? 'error' : ''}`}
                  value={formData.employees}
                  onChange={(e) => handleChange('employees', e.target.value)}
                >
                  <option value="">Select range</option>
                  {employeeOptions.map((range) => (
                    <option key={range} value={range}>
                      {range} employees
                    </option>
                  ))}
                </select>
                {errors.employees && <span className="error-message">{errors.employees}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} />
                  Founded Year *
                </label>
                <input
                  type="number"
                  className={`input ${errors.founded ? 'error' : ''}`}
                  value={formData.founded}
                  onChange={(e) => handleChange('founded', e.target.value)}
                  placeholder="e.g. 2020"
                  min="1800"
                  max={new Date().getFullYear()}
                />
                {errors.founded && <span className="error-message">{errors.founded}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Globe size={16} />
                  Website
                </label>
                <input
                  type="url"
                  className={`input ${errors.website ? 'error' : ''}`}
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://example.com"
                />
                {errors.website && <span className="error-message">{errors.website}</span>}
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} />
                  Email
                </label>
                <input
                  type="email"
                  className={`input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="contact@company.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} />
                  Phone
                </label>
                <input
                  type="tel"
                  className="input"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                <Building2 size={16} />
                Company Description *
              </label>
              <textarea
                className={`input textarea ${errors.description ? 'error' : ''}`}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what the company does, its mission, and key services..."
                rows={4}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>

          {/* Footer */}
          <div className="form-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : company ? 'Update Company' : 'Add Company'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CompanyForm;