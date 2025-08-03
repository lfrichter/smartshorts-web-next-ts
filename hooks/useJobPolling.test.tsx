import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import * as apiService from '../services/apiService';
import { Job } from '../types'; // Importando nosso tipo Job
import useJobPolling from './useJobPolling';

// Mock do módulo de API
vi.mock('../services/apiService');

describe('useJobPolling', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('deve verificar e atualizar o status de um job ativo', async () => {
    // Adicionando tipo para o estado inicial
    const initialJobs: Job[] = [{ jobId: 'job1', status: 'PENDING', createdAt: new Date().toISOString() }];
    const setJobs = vi.fn();

    // Mock da resposta da API
    (apiService.getJobStatus as Mock).mockResolvedValue({ jobId: 'job1', status: 'PROCESSING' });

    renderHook(() => useJobPolling(initialJobs, setJobs));

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(apiService.getJobStatus).toHaveBeenCalledWith('job1');
    expect(setJobs).toHaveBeenCalledTimes(1);

    const updaterFunction = setJobs.mock.calls[0][0];
    const newState = updaterFunction(initialJobs);
    expect(newState[0].status).toBe('PROCESSING');
  });
});
