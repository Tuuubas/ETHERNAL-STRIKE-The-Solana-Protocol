'use client';

import './globals.css';
import Navbar from '../components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './login/page';

function AppContent({ children }: { children: React.ReactNode }) {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}
