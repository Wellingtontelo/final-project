import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Reports API
export const reportsAPI = {
  getAll: (params) => API.get('/reports', { params }),
  getOne: (id) => API.get(`/reports/${id}`),
  create: (data) => API.post('/reports', data),
  update: (id, data) => API.put(`/reports/${id}`, data),
};

// Police Reports API
export const policeAPI = {
  create: (data) => API.post('/police/report', data),
  getAll: (params) => API.get('/police/reports', { params }),
  update: (id, data) => API.put(`/police/reports/${id}`, data),
};

// Auth API
export const authAPI = {
  login: (data) => API.post('/users/login', data),
  register: (data) => API.post('/users/register', data),
  getMe: () => API.get('/users/me'),
};

export default API;