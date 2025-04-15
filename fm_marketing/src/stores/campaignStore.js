import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const useCampaignStore = create((set, get) => ({
  campaigns: [],
  currentCampaign: null,
  isLoading: false,
  error: null,
  
  // Admin actions
  fetchCampaigns: async (page = 0, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/campaigns?page=${page}&size=${size}`);
      set({ 
        campaigns: response.data.data.content,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch campaigns',
        isLoading: false 
      });
    }
  },
  
  fetchCampaignDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/campaigns/${id}`);
      set({ 
        currentCampaign: response.data.data,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching campaign details:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch campaign details',
        isLoading: false 
      });
    }
  },
  
  createCampaign: async (campaignData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/admin/campaigns`, campaignData);
      // Refresh campaigns list
      await get().fetchCampaigns();
      set({ isLoading: false });
      return response.data.data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to create campaign',
        isLoading: false 
      });
      return null;
    }
  },
  
  updateCampaign: async (id, campaignData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/admin/campaigns/${id}`, campaignData);
      // Update local state
      set({ 
        currentCampaign: response.data.data,
        isLoading: false 
      });
      // Refresh campaigns list
      await get().fetchCampaigns();
      return response.data.data;
    } catch (error) {
      console.error('Error updating campaign:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to update campaign',
        isLoading: false 
      });
      return null;
    }
  },
  
  deleteCampaign: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/admin/campaigns/${id}`);
      // Refresh campaigns list
      await get().fetchCampaigns();
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to delete campaign',
        isLoading: false 
      });
      return false;
    }
  },
  
  // Public actions for fetching available campaigns
  fetchPublicCampaigns: async (page = 0, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/common/campaigns?page=${page}&size=${size}`);
      set({ 
        campaigns: response.data.data.content,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching public campaigns:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch campaigns',
        isLoading: false 
      });
    }
  },
  
  fetchPublicCampaignDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/common/campaigns/${id}`);
      set({ 
        currentCampaign: response.data.data,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching public campaign details:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch campaign details',
        isLoading: false 
      });
    }
  },
  
  clearError: () => set({ error: null })
}));
