'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState('Não conectado');
  const [balance, setBalance] = useState('0 SOL');

  if (!user) {
    return <div>Você precisa fazer login para ver o perfil.</div>;
  }

  function handleConnect() {
    setConnected(true);
    setWallet('Fg4sH...a9Kz');
    setBalance('2.14 SOL');
  }

  const isAdmin = user.admin;
  const updateStat = async (updates: Partial<typeof user>) => {
    if (!isAdmin) {
      return;
    }
    await updateProfile(updates);
  };

  return (
    <section className="page-shell">
      <div className="hero-block">
        <div>
          <p className="eyebrow">Perfil do atleta</p>
          <h1>Veja seu histórico esportivo e digital.</h1>
          <p className="hero-text">
            Este perfil reúne conquistas, medalhas e a carteira conectada para trazer mais utilidade ao registro escolar.
          </p>
        </div>
        <div className="profile-card">
          <h2>{connected ? 'Carteira conectada' : 'Conexão de wallet'}</h2>
          <p>{connected ? wallet : 'Clique para conectar ao Phantom/Solflare.'}</p>
          <strong>{connected ? balance : '0 SOL'}</strong>
          <button type="button" className="btn-primary" onClick={handleConnect}>
            {connected ? 'Atualizar perfil' : 'Conectar Wallet'}
          </button>
        </div>
      </div>

      <div className="content-grid">
        <div className="card card-panel profile-summary">
          <h2>Dados do atleta</h2>
          <dl>
            <dt>Nome</dt>
            <dd>{user.name}</dd>
            <dt>Email</dt>
            <dd>{user.email}</dd>
            <dt>Escola</dt>
            <dd>{user.school || 'Sem escola definida'}</dd>
            <dt>Honraria</dt>
            <dd>{user.honor || 'Sem honraria definida'}</dd>
          </dl>
          <button type="button" className="btn-secondary" onClick={() => updateProfile({ honor: 'Atleta conectado ao Ethernal Strike' })}>
            Atualizar honraria
          </button>
        </div>

        <div className="card card-panel stats-grid">
          <div>
            <span className="stat-value">{user.games}</span>
            <p>Jogos disputados</p>
          </div>
          <div>
            <span className="stat-value">{user.victories}</span>
            <p>Vitórias</p>
          </div>
          <div>
            <span className="stat-value">{user.medals}</span>
            <p>Medalhas SBT</p>
          </div>
        </div>
      </div>

      <div className="actions-grid">
        {!isAdmin ? (
          <p className="form-message warning">Somente administradores podem registrar jogos, vitórias e medalhas.</p>
        ) : null}
        <button type="button" className="btn-primary" disabled={!isAdmin} onClick={() => updateStat({ games: user.games + 1 })}>
          Registrar jogo disputado
        </button>
        <button type="button" className="btn-primary" disabled={!isAdmin} onClick={() => updateStat({ victories: user.victories + 1, games: user.games + 1 })}>
          Registrar vitória
        </button>
        <button type="button" className="btn-primary" disabled={!isAdmin} onClick={() => updateStat({ medals: user.medals + 1 })}>
          Registrar medalha SBT
        </button>
      </div>
    </section>
  );
}
