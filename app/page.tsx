// app/page.tsx

"use client"; // Esta página é interativa, então é um Componente de Cliente

import JobCreator from "@/components/JobCreator";
import JobList from "@/components/JobList";
import useJobPolling from "@/hooks/useJobPolling";
import { Job } from "@/types"; // Importando o tipo Job
import { useState } from "react";

export default function DashboardPage() {
  // O estado 'jobs' agora é estritamente tipado como um array de Job
  const [jobs, setJobs] = useState<Job[]>([]);

  // O hook de polling agora trabalha com dados tipados
  useJobPolling(jobs, setJobs);

  // A função de callback corresponde ao tipo que definimos no JobCreator
  const handleJobCreated = (jobId: string) => {
    const newJob: Job = {
      jobId: jobId,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  // NOTA: A lógica de logout será adicionada quando refatorarmos a autenticação
  const handleLogout = () => {
    alert("Logout a ser implementado!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 text-center py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">SmartShorts Video Factory</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 mt-8">
        <JobCreator onJobCreated={handleJobCreated} />
        <JobList jobs={jobs} />
      </main>
    </div>
  );
}
