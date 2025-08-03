// components/JobDetailsModal.tsx
"use client";

import { Job } from "@/types";

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
}

export default function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white rounded-lg shadow-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Evita que o clique dentro do modal o feche
      >
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Detalhes do Job</h2>
        <div className="space-y-3">
          <p><strong>Job ID:</strong> <span className="font-mono text-sm">{job.jobId}</span></p>
          <p><strong>Status:</strong> <span className="font-semibold">{job.status}</span></p>
          <p><strong>Criado em:</strong> <span>{new Date(job.createdAt).toLocaleString('pt-BR')}</span></p>
          <p><strong>Última Atualização:</strong> <span>{job.lastUpdatedAt ? new Date(job.lastUpdatedAt).toLocaleString('pt-BR') : 'N/A'}</span></p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
