// app/login/page.tsx

"use client"; // 1. Diretiva que marca este como um Componente de Cliente (interativo)

import Spinner from '@/components/Spinner';
import Link from 'next/link'; // 2. Importa o Link do Next.js, não do react-router-dom
import { useRouter } from 'next/navigation'; // 3. Importa o useRouter do Next.js
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // ATUALIZAÇÃO: Usando fetch para chamar nosso próprio endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciais inválidas');
      }

      router.push('/'); // Redireciona para a página inicial após o login bem-sucedido

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-400 text-center">{error}</p>}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-300"
            >
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-900 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-900 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Entrar'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-medium text-indigo-400 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}


