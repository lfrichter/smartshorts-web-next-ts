// app/page.tsx

"use client";

import JobCreator from "@/components/JobCreator";
import JobDetailsModal from "@/components/JobDetailsModal";
import JobList from "@/components/JobList";
import useJobPolling from "@/hooks/useJobPolling";
import { getAllJobs, logout } from "@/services/apiService";
import { Job } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInitialJobs = async () => {
      try {
        const initialJobs = await getAllJobs();
        setJobs(initialJobs);
      } catch (error) {
        console.error("Falha ao carregar jobs iniciais.");
        // Opcional: Adicionar estado de erro para exibir na UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialJobs();
  }, []);

  useJobPolling(jobs, setJobs);

  const handleJobCreated = (jobId: string) => {
    const newJob: Job = {
      jobId: jobId,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  }

  const handleCloseModal = () => {
    setSelectedJob(null);
  }

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
        {/* Adiciona uma verificação de carregamento */}
        {isLoading ? (
          <p className="text-center mt-8">Carregando jobs...</p>
        ) : (
          <JobList jobs={jobs} onJobClick={handleJobClick} />
        )}
      </main>
      <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
    </div>
  );
}
