import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Interceptor para agregar token en cada petición
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      Cookies.set('auth_token', response.data.token, { 
        expires: 1,
        sameSite: 'strict'
      });
    }
    return response.data;
  },

  logout: async () => {
    await api.delete('/logout');
    Cookies.remove('auth_token');
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  }
};