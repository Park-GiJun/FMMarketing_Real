import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { data } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Configure axios defaults for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      set({ 
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role
        },
        token: data.token,
        isAuthenticated: true,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to login. Please check your credentials.',
        isLoading: false
      });
      return false;
    }
  },

  logout: () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove Authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    set({ 
      user: null,
      token: null,
      isAuthenticated: false
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return false;
    }

    // Set Authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    try {
      // Validate the token by making a request to a protected endpoint
      const response = await axios.get(`${API_URL}/auth/me`);
      const { data } = response.data;
      
      set({
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role
        },
        isAuthenticated: true
      });
      
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      // If token is invalid, logout
      get().logout();
      return false;
    }
  },

  clearError: () => set({ error: null })
}));

// Initialize axios with token if it exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
