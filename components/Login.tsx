// src/components/Login.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/apiService';
import Spinner from './Spinner';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await login({ username, password });
      onLoginSuccess(); // Notifica o App.jsx que o login foi bem-sucedido
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
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
          <Link to="/register" className="font-medium text-indigo-400 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
