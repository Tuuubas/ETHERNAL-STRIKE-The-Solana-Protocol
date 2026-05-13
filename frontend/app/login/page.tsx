'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      const error = await signup(email, password, name);
      if (!error) {
        router.push('/');
      } else {
        setError(error);
      }
      return;
    }

    const error = await login(email, password);
    if (!error) {
      router.push('/');
    } else {
      setError(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>{isSignup ? 'Criar Conta' : 'Entrar'}</h1>
        <p className="form-mode">{isSignup ? 'Modo cadastro: use um email novo' : 'Modo login: use sua conta existente'}</p>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-primary">
            {isSignup ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setIsSignup(!isSignup);
            setError('');
          }}
        >
          {isSignup ? 'Já tenho conta' : 'Criar conta'}
        </button>
      </div>
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f5f5f5;
        }
        .login-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          width: 300px;
        }
        .login-card h1 {
          text-align: center;
          margin-bottom: 0.4rem;
        }
        .form-mode {
          text-align: center;
          font-size: 0.9rem;
          color: #4b5563;
          margin-bottom: 1rem;
        }
        .login-card div {
          margin-bottom: 1rem;
        }
        .login-card label {
          display: block;
          margin-bottom: 0.5rem;
        }
        .login-card input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: red;
          font-size: 0.9rem;
        }
        .btn-primary {
          width: 100%;
          padding: 0.75rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 1rem;
        }
        .btn-secondary {
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          color: #0070f3;
          border: 1px solid #0070f3;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
