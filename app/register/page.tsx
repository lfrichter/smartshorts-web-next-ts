"use client"; // Componente interativo que roda no navegador

import Spinner from '@/components/Spinner';
import Link from 'next/link'; // Link do Next.js
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter(); // 2. Inicializa o router

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Usa a mensagem de erro que vem da nossa API Next.js
        throw new Error(data.error || 'Falha no registro');
      }

      setSuccess('Usuário criado com sucesso! Redirecionando para o login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Criar Nova Conta</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-400 text-center">{error}</p>}
          {success && <p className="text-green-400 text-center">{success}</p>}
          <div>
            <label htmlFor="username" /* ... */>Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-900 border border-gray-700 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" /* ... */>Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-900 border border-gray-700 rounded-md"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Registrar'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-medium text-indigo-400 hover:underline">
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
}
