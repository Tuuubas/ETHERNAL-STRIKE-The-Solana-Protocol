'use client';

import { useAuth } from './context/AuthContext';
import LoginPage from './login/page';
import Navbar from '../components/Navbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
