
import { useEffect, useState } from 'react';
import useJobPolling from '../hooks/useJobPolling';
import JobCreator from './JobCreator';
import JobList from './JobList';
import Login from './Login';

function MainLayout({ onLogout }) {
  const [jobs, setJobs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hook para verificar o token no carregamento da página
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useJobPolling(jobs, setJobs);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleJobCreated = (jobId) => {
    const newJob = {
      jobId: jobId,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  // Se não estiver autenticado, mostra a tela de Login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }
  return (
     <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 text-center py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">SmartShorts Video Factory</h1>
          <button onClick={onLogout} /* ... */ >Sair</button>
        </div>
      </header>
      <main className="container mx-auto px-4 mt-8">
        <JobCreator onJobCreated={handleJobCreated} />
        <JobList jobs={jobs} />
      </main>
    </div>
  )
}

export default MainLayout;
