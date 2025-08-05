import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Company API calls
export const companyAPI = {
  getAllCompanies: () => api.get('/companies'),
  getCompanyById: (id) => api.get(`/companies/${id}`),
  createCompany: (company) => api.post('/companies', company),
  updateCompany: (id, company) => api.put(`/companies/${id}`, company),
  deleteCompany: (id) => api.delete(`/companies/${id}`),
  searchCompanies: (keyword) => api.get(`/companies/search?keyword=${keyword}`),
  getCompaniesByIndustry: (industry) => api.get(`/companies/by-industry?industry=${industry}`),
  getCompaniesByLocation: (location) => api.get(`/companies/by-location?location=${location}`),
  getAllIndustries: () => api.get('/companies/industries'),
  getCompaniesCount: () => api.get('/companies/count'),
};

// Job API calls
export const jobAPI = {
  getAllJobs: () => api.get('/jobs'),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (job) => api.post('/jobs', job),
  updateJob: (id, job) => api.put(`/jobs/${id}`, job),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  deactivateJob: (id) => api.put(`/jobs/${id}/deactivate`),
  getJobsByCompany: (companyId) => api.get(`/jobs/company/${companyId}`),
  searchJobs: (keyword) => api.get(`/jobs/search?keyword=${keyword}`),
  getJobsByType: (jobType) => api.get(`/jobs/by-type?jobType=${jobType}`),
  getJobsByExperience: (level) => api.get(`/jobs/by-experience?level=${level}`),
  getJobsByLocation: (location) => api.get(`/jobs/by-location?location=${location}`),
  getActiveJobsCount: () => api.get('/jobs/count'),
};

// Request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;