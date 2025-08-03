// src/hooks/useJobPolling.js

import { useEffect } from 'react';
import { getJobStatus } from '../services/apiService';

const POLLING_INTERVAL = 5000; // 5 segundos
const FINAL_STATUSES = ['COMPLETED', 'FAILED'];

function useJobPolling(jobs, setJobs) {
  useEffect(() => {
    // A função que efetivamente busca os status
    const pollJobs = async () => {
      const activeJobs = jobs.filter(job => !FINAL_STATUSES.includes(job.status));
      if (activeJobs.length === 0) return;

      for (const job of activeJobs) {
        try {
          const updatedJob = await getJobStatus(job.jobId);
          // Atualiza o estado apenas se o status mudou
          if (updatedJob.status !== job.status) {
            setJobs(prevJobs =>
              prevJobs.map(j =>
                j.jobId === updatedJob.jobId
                  ? { ...j, status: updatedJob.status, lastUpdatedAt: updatedJob.lastUpdatedAt }
                  : j
              )
            );
          }
        } catch (error) {
          console.error(`Falha ao atualizar o job ${job.jobId}`, error);
          // Opcional: Marcar o job como falho no UI se a API retornar um erro grave (ex: 404)
        }
      }
    };

    // Inicia o intervalo de polling
    const intervalId = setInterval(pollJobs, POLLING_INTERVAL);

    // Função de limpeza: para o polling quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [jobs, setJobs]);
}

export default useJobPolling;
