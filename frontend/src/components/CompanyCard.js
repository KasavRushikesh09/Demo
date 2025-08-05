import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Code, 
  Settings,
  Edit3,
  Trash2,
  Eye,
  Building
} from 'lucide-react';

const CompanyCard = ({ company, onEdit, onDelete, onView, showActions = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative h-96 w-full perspective-1000"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      {/* Card Container */}
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700"
        animate={isFlipped ? "back" : "front"}
        variants={flipVariants}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="card h-full p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {company.logoUrl ? (
                  <img 
                    src={company.logoUrl} 
                    alt={`${company.name} logo`}
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {company.industry}
                  </span>
                </div>
              </div>
              
              {showActions && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView(company)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(company)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(company.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {company.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 truncate">{company.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{company.foundedYear}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 truncate">{company.employeeCount}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 truncate">{company.revenue}</span>
              </div>
            </div>

            {/* Website Link */}
            {company.website && (
              <div className="mt-auto pt-4">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden transform rotateY-180">
          <div className="card h-full p-6 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
            <h3 className="text-xl font-bold mb-4">{company.name} Details</h3>
            
            {/* Technologies */}
            {company.technologies && company.technologies.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Code className="h-4 w-4" />
                  <h4 className="font-semibold">Technologies</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.technologies.slice(0, 6).map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-white/20 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {company.services && company.services.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Settings className="h-4 w-4" />
                  <h4 className="font-semibold">Services</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.services.slice(0, 4).map((service, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-white/20 rounded-md text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-auto pt-4">
              <button className="w-full bg-white text-primary-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                Explore Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;