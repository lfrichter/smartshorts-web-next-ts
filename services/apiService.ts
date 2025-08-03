// services/apiService.ts
import { Job, JobCreationResponse, JobUploadPayload } from '@/types';
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

export const createJobFromJsonUpload = async (jsonData: JobUploadPayload): Promise<JobCreationResponse> => {
  const response = await api.post('/jobs/upload', jsonData);
  return response.data;
};

export const getJobStatus = async (jobId: string): Promise<Job> => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

/**
 * Busca todos os jobs de renderização existentes.
 * Corresponde ao endpoint GET /jobs
 * @returns {Promise<Job[]>} Uma lista de jobs.
 */
export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const response = await api.get('/jobs');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todos os jobs:', error);
    throw error;
  }
};
