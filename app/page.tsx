// app/page.tsx

"use client";

import JobCreator from "@/components/JobCreator";
import JobList from "@/components/JobList";
import useJobPolling from "@/hooks/useJobPolling";
import { logout } from "@/services/apiService";
import { Job } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();
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
