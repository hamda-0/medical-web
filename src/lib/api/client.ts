// lib/api/client.ts
import axios, { AxiosResponse } from 'axios';

// Create axios instance for internal API calls
const apiClient = axios.create({
  baseURL: 'http://localhost:6015/api/v1/', // This will call your Next.js API routes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we get 401 and haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await apiClient.post('/auth/refresh');
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  // Add other user fields
}

export interface MedicalInfo {
  id: number;
  userId: number;
  // Add medical info fields
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

// Auth API Service
export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<ApiResponse<{ user: User }>> => {
    try {
      const response: AxiosResponse<ApiResponse<{ user: User }>> = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Login failed', success: false };
    }
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await apiClient.post('/auth/logout');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Logout failed', success: false };
    }
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await apiClient.post('/auth/refresh');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Token refresh failed', success: false };
    }
  },

  // Get user profile
  getUserProfile: async (): Promise<ApiResponse<User>> => {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await apiClient.get('/user/profile');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Failed to fetch profile', success: false };
    }
  }
};

// Medical API Service
export const medicalService = {
  // Get all medical info
  getAll: async (): Promise<ApiResponse<MedicalInfo[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<MedicalInfo[]>> = await apiClient.get('/medical');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Failed to fetch medical info', success: false };
    }
  },

  // Get specific medical info
  getById: async (id: number): Promise<ApiResponse<MedicalInfo>> => {
    try {
      const response: AxiosResponse<ApiResponse<MedicalInfo>> = await apiClient.get(`/medical/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Failed to fetch medical info', success: false };
    }
  },

  // Create medical info
  create: async (data: Omit<MedicalInfo, 'id' | 'userId'>): Promise<ApiResponse<MedicalInfo>> => {
    try {
      const response: AxiosResponse<ApiResponse<MedicalInfo>> = await apiClient.post('/medical', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Failed to create medical info', success: false };
    }
  },

  // Update medical info
  update: async (id: number, data: Partial<MedicalInfo>): Promise<ApiResponse<MedicalInfo>> => {
    try {
      const response: AxiosResponse<ApiResponse<MedicalInfo>> = await apiClient.patch(`/medical/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Failed to update medical info', success: false };
    }
  },

  // Delete medical info
  delete: async (id: number): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await apiClient.delete(`/medical/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Failed to delete medical info', success: false };
    }
  },

  // Generate slip
  generateSlip: async (medicalId: number): Promise<ApiResponse<{ slipUrl: string }>> => {
    try {
      const response: AxiosResponse<ApiResponse<{ slipUrl: string }>> = await apiClient.post(`/medical/generate-slip/${medicalId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Failed to generate slip', success: false };
    }
  }
};

export default apiClient;