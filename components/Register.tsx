import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/apiService';
import Spinner from './Spinner';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await register({ username, password });
      setSuccess('Usuário criado com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 2000); // Redireciona para o login após 2s
    } catch (err) {
      setError('Usuário já existente ou dados inválidos.');
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
          <Link to="/login" className="font-medium text-indigo-400 hover:underline">
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
