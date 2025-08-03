// src/components/JobListItem.jsx

import { Job } from "@/types";
import { useEffect, useState } from 'react';

function JobListItem({ job }: { job: Job }) {
  const [copied, setCopied] = useState(false);

  const statusConfig = {
    PENDING: { text: 'Pendente', className: 'bg-yellow-500' },
    PROCESSING: { text: 'Processando', className: 'bg-blue-500' },
    COMPLETED: { text: 'Concluído', className: 'bg-green-500' },
    FAILED: { text: 'Falhou', className: 'bg-red-500' },
    UNKNOWN: { text: 'Desconhecido', className: 'bg-gray-500' }
  };

  const { text: statusText, className: statusColorClass } = statusConfig[job.status] || statusConfig.UNKNOWN;

  // Efeito para resetar o estado de "copiado" após 2 segundos
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer); // Limpeza do timer
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(job.jobId).then(() => {
      setCopied(true);
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4 items-center bg-gray-900 p-3 rounded-lg">
      <div className="font-mono text-sm truncate" title={job.jobId}>
        {job.jobId}
      </div>
      <div className="flex items-center">
        <span className={`w-3 h-3 rounded-full mr-2 ${statusColorClass}`}></span>
        <span>{statusText}</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleCopy}
          className="text-indigo-400 hover:text-indigo-300 text-sm disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={copied}
        >
          {copied ? 'Copiado!' : 'Copiar ID'}
        </button>
        <button className="text-gray-400 hover:text-gray-300 text-sm">
          Detalhes
        </button>
      </div>
    </div>
  );
}

export default JobListItem;
