import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">IT Companies Hub</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to connecting talented professionals with the world's most innovative technology companies.
          </p>
        </motion.div>

        <motion.div
          className="prose prose-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              IT Companies Hub is your gateway to the most exciting opportunities in the technology industry. 
              We curate and showcase the world's leading IT companies, providing comprehensive information about 
              their technologies, culture, and career opportunities.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're a recent graduate looking for your first role or an experienced professional 
              seeking your next challenge, we're here to help you discover and connect with companies that 
              align with your goals and values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="bg-primary-50 rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Building2 className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Top Companies</h3>
              <p className="text-gray-600">Curated list of the world's leading technology companies</p>
            </motion.div>

            <motion.div
              className="bg-green-50 rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Career Opportunities</h3>
              <p className="text-gray-600">Access to thousands of job openings across various tech roles</p>
            </motion.div>

            <motion.div
              className="bg-purple-50 rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Stay up-to-date with the latest company information and job postings</p>
            </motion.div>

            <motion.div
              className="bg-orange-50 rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">Companies and opportunities from around the world</p>
            </motion.div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Started Today</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ready to explore the exciting world of technology careers? Browse our comprehensive database 
              of IT companies, discover new opportunities, and take the next step in your professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">Explore Companies</button>
              <button className="btn-secondary">View Career Opportunities</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;