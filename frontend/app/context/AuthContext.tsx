'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  email: string;
  password: string;
  name: string;
  school: string;
  honor: string;
  photo: string;
  games: number;
  victories: number;
  medals: number;
  admin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          const response = await fetch(`/api/users?email=${encodeURIComponent(parsedUser.email)}`);
          if (response.ok) {
            const latestUser = (await response.json()) as User;
            setUser(latestUser);
            localStorage.setItem('user', JSON.stringify(latestUser));
          } else {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Erro ao restaurar sessão do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return errorData?.error ?? 'Falha no login.';
      }

      const foundUser = (await response.json()) as User;
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return 'Falha no login. Tente novamente.';
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return errorData?.error ?? 'Falha no cadastro.';
      }

      const newUser = (await response.json()) as User;
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return null;
    } catch (error) {
      console.error('Signup error:', error);
      return 'Falha no cadastro. Tente novamente.';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, requesterEmail: user.email, updates }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Erro ao atualizar perfil', errorData?.error ?? '');
        return;
      }

      const updatedUser = (await response.json()) as User;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
