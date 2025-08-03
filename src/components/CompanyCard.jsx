import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Edit3,
  Trash2,
  MapPin,
  Users,
  Globe,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  MoreVertical
} from 'lucide-react';
import './CompanyCard.css';

const CompanyCard = ({ company, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${company.name}?`)) {
      onDelete(company.id);
    }
  };

  const handleWebsiteClick = (e) => {
    e.stopPropagation();
    if (company.website) {
      window.open(company.website, '_blank');
    }
  };

  const handleEmailClick = (e) => {
    e.stopPropagation();
    if (company.email) {
      window.location.href = `mailto:${company.email}`;
    }
  };

  const handlePhoneClick = (e) => {
    e.stopPropagation();
    if (company.phone) {
      window.location.href = `tel:${company.phone}`;
    }
  };

  return (
    <motion.div
      className="company-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="card-header">
        <div className="company-logo">
          <span>{company.logo}</span>
        </div>
        <div className="company-basic-info">
          <h3 className="company-name">{company.name}</h3>
          <span className="company-industry">{company.industry}</span>
        </div>
        <div className="card-actions">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="action-btn"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreVertical size={16} />
          </motion.button>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="actions-dropdown"
            >
              <button
                className="dropdown-item edit"
                onClick={() => {
                  onEdit(company);
                  setShowActions(false);
                }}
              >
                <Edit3 size={14} />
                Edit
              </button>
              <button
                className="dropdown-item delete"
                onClick={() => {
                  handleDelete();
                  setShowActions(false);
                }}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="card-description">
        <p>{company.description}</p>
      </div>

      {/* Details Grid */}
      <div className="card-details">
        <div className="detail-item">
          <MapPin size={16} className="detail-icon" />
          <span>{company.location}</span>
        </div>
        <div className="detail-item">
          <Users size={16} className="detail-icon" />
          <span>{company.employees} employees</span>
        </div>
        <div className="detail-item">
          <Calendar size={16} className="detail-icon" />
          <span>Founded {company.founded}</span>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="card-footer">
        <div className="contact-actions">
          {company.website && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="contact-btn website"
              onClick={handleWebsiteClick}
              title="Visit Website"
            >
              <Globe size={16} />
              <ExternalLink size={12} className="external-icon" />
            </motion.button>
          )}
          {company.email && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="contact-btn email"
              onClick={handleEmailClick}
              title="Send Email"
            >
              <Mail size={16} />
            </motion.button>
          )}
          {company.phone && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="contact-btn phone"
              onClick={handlePhoneClick}
              title="Call Phone"
            >
              <Phone size={16} />
            </motion.button>
          )}
        </div>
        <div className="card-edit-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-sm btn-secondary"
            onClick={() => onEdit(company)}
          >
            <Edit3 size={14} />
            Edit
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;