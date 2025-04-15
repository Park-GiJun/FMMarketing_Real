import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const useApplicationStore = create((set, get) => ({
  applications: [],
  currentApplication: null,
  isLoading: false,
  error: null,
  
  // Blogger actions
  fetchMyApplications: async (page = 0, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/blogger/applications?page=${page}&size=${size}`);
      set({ 
        applications: response.data.data.content,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching applications:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch applications',
        isLoading: false 
      });
    }
  },
  
  applyToCampaign: async (campaignId, applicationData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/blogger/campaigns/${campaignId}/apply`, applicationData);
      
      // Refresh applications list
      get().fetchMyApplications();
      
      set({ isLoading: false });
      return response.data.data;
    } catch (error) {
      console.error('Error applying to campaign:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to apply to campaign',
        isLoading: false 
      });
      return null;
    }
  },
  
  submitReview: async (campaignId, reviewData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/blogger/campaigns/${campaignId}/review`, reviewData);
      
      // Refresh applications list
      get().fetchMyApplications();
      
      set({ isLoading: false });
      return response.data.data;
    } catch (error) {
      console.error('Error submitting review:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to submit review',
        isLoading: false 
      });
      return null;
    }
  },
  
  // Admin actions
  fetchCampaignApplications: async (campaignId, page = 0, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin/applications/campaign/${campaignId}?page=${page}&size=${size}`);
      set({ 
        applications: response.data.data.content,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching campaign applications:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch campaign applications',
        isLoading: false 
      });
    }
  },
  
  updateApplicationStatus: async (applicationId, statusData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/admin/applications/${applicationId}/status`, statusData);
      
      // If we're viewing applications for a campaign, refresh the list
      const currentApplications = get().applications;
      if (currentApplications.length > 0) {
        // Find the updated application in the list
        const updatedIndex = currentApplications.findIndex(app => app.id === applicationId);
        if (updatedIndex !== -1) {
          // Create a new array with the updated application
          const updatedApplications = [...currentApplications];
          updatedApplications[updatedIndex] = response.data.data;
          set({ applications: updatedApplications });
        }
      }
      
      set({ isLoading: false });
      return response.data.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to update application status',
        isLoading: false 
      });
      return null;
    }
  },
  
  // Store actions
  fetchCampaignReviews: async (campaignId, page = 0, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/store/campaigns/${campaignId}/reviews?page=${page}&size=${size}`);
      set({ 
        applications: response.data.data.content,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching campaign reviews:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch campaign reviews',
        isLoading: false 
      });
    }
  },
  
  clearError: () => set({ error: null })
}));
