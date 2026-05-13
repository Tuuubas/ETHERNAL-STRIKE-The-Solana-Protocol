'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../app/context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="navbar">
      <div className="brand">
        <Link href="/" className="brand-link">
          <Image src="/logo.svg" alt="Logo Ethernal Strike" width={48} height={48} className="brand-logo" />
          <span>Ethernal Strike</span>
        </Link>
      </div>
      <nav className="nav-links">
        <Link href="/tournaments">Torneios</Link>
        <Link href="/profile">Perfil</Link>
        <Link href="/hall-da-fama">Hall da Fama</Link>
        <button type="button" className="logout-button" onClick={logout}>
          Sair
        </button>
      </nav>
    </header>
  );
}
