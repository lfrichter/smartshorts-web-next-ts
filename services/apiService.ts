// services/apiService.ts
import { Job, JobCreationResponse } from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  setAuthToken(null);
};

export const createJobFromPrompt = async (prompt: string): Promise<JobCreationResponse> => {
  const response = await api.post('/jobs/prompt', { prompt });
  return response.data;
};

export const createJobFromJsonUpload = async (jsonData: any): Promise<JobCreationResponse> => {
  const response = await api.post('/jobs/upload', jsonData);
  return response.data;
};

export const getJobStatus = async (jobId: string): Promise<Job> => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};
