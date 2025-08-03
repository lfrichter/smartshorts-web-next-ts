// src/components/JobList.jsx

import { Job } from "@/types";
import JobListItem from './JobListItem';

function JobList({ jobs, onJobClick }: { jobs: Job[], onJobClick: (job: Job) => void }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Fila de Processamento</h2>

      <div className="grid grid-cols-3 gap-4 text-sm font-bold text-gray-400 border-b border-gray-700 pb-2 mb-4">
        <div>ID do Job</div>
        <div>Status</div>
        <div>Ações</div>
      </div>

      <div className="space-y-4">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <JobListItem key={job.jobId} job={job} onJobClick={onJobClick} />
          ))
        ) : (
          <p className="text-gray-500">Nenhum job em processamento.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
